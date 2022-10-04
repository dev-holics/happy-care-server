import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant';

@Injectable()
export class AuthPayloadDefaultGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { user } = request;

		if (!user?.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_INACTIVE_ERROR,
				message: 'auth.error.blocked',
			});
		} else if (!user?.role?.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ROLE_INACTIVE_ERROR,
				message: 'auth.error.roleBlocked',
			});
		}

		return true;
	}
}
