import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants/auth.enum.constant';
import { AUTH_PERMISSION_META_KEY } from 'src/common/auth/constants';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant';
import { IAuthPermission } from 'src/common/auth/interfaces/auth.interface';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthPayloadPermissionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermissions: IAuthPermission[] =
			this.reflector.getAllAndOverride<IAuthPermission[]>(
				AUTH_PERMISSION_META_KEY,
				[context.getHandler(), context.getClass()],
			);

		if (!requiredPermissions) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest<IRequestApp>();
		const { role } = user;

		if (role.accessLevel === ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN) {
			return true;
		}

		const permissions: number[] = role.permissions
			.filter((val: IAuthPermission) => val.isActive)
			.map((val: IAuthPermission) => val.code);

		const hasPermission: boolean = requiredPermissions.some(permission =>
			permissions.includes(permission.code),
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
