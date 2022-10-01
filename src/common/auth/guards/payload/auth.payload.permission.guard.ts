import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants/auth.enum.constant';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant';
import { IAuthPermission } from 'src/common/auth/interfaces/auth.interface';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { RedisService } from 'src/common/redis/services/redis.service';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

@Injectable()
export class AuthPayloadPermissionGuard implements CanActivate {
	constructor(
		private readonly redisService: RedisService,
		private readonly permissionRepository: PermissionRepository,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		let requiredPermissions: PermissionEntity[] = await this.redisService
			.appPermission()
			.get();

		if (!requiredPermissions) {
			requiredPermissions = await this.permissionRepository.findAll();
			if (!requiredPermissions) return true;
			await this.redisService.appPermission().set(requiredPermissions);
		}

		const { user } = context.switchToHttp().getRequest<IRequestApp>();
		const { role } = user;
		if (role.accessLevel === ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN) {
			return true;
		}

		const permissions: PermissionEntity[] = role.permissions
			.filter((val: IAuthPermission) => val.isActive)
			.map((val: IAuthPermission) => val.code);

		const hasPermission: boolean = requiredPermissions.every(permission =>
			permissions.includes(permission),
		);

		if (!hasPermission) {
			throw new ForbiddenException({
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PERMISSION_INVALID_ERROR,
				message: 'auth.error.permissionForbidden',
			});
		}
		return hasPermission;
	}
}
