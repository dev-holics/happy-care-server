import {
	applyDecorators,
	HttpStatus,
	SetMetadata,
	UseGuards,
} from '@nestjs/common';
import {
	ResponseDoc,
	ResponseDocOneOf,
} from 'src/common/response/decorators/response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
	AUTH_PERMISSION_META_KEY,
	ENUM_AUTH_STATUS_CODE_ERROR,
} from 'src/common/auth/constants';
import { JwtRefreshGuard } from 'src/common/auth/guards/jwt-refresh/auth.jwt-refresh.guard';
import { JwtGuard } from 'src/common/auth/guards/jwt/auth.jwt.guard';
import { AuthPayloadDefaultGuard } from 'src/common/auth/guards/payload/auth.payload.default.guard';
import { AuthPayloadPermissionGuard } from 'src/common/auth/guards/payload/auth.payload.permission.guard';
import { IAuthPermission } from 'src/common/auth/interfaces/auth.interface';

export function AuthJwtGuard(permissions?: IAuthPermission[]): any {
	return applyDecorators(
		ApiBearerAuth('accessToken'),
		ResponseDoc({
			httpStatus: HttpStatus.UNAUTHORIZED,
			messagePath: 'http.clientError.unauthorized',
			statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
		}),
		ResponseDocOneOf(
			HttpStatus.FORBIDDEN,
			{
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PERMISSION_INVALID_ERROR,
				messagePath: 'auth.error.permissionForbidden',
			},
			{
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PASSWORD_EXPIRED_ERROR,
				messagePath: 'auth.error.passwordExpired',
			},
			{
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ACCESS_FOR_INVALID_ERROR,
				messagePath: 'auth.error.accessForForbidden',
			},
			{
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_INACTIVE_ERROR,
				messagePath: 'auth.error.blocked',
			},
			{
				statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ROLE_INACTIVE_ERROR,
				messagePath: 'auth.error.roleBlocked',
			},
		),
		UseGuards(JwtGuard, AuthPayloadDefaultGuard, AuthPayloadPermissionGuard),
		SetMetadata(AUTH_PERMISSION_META_KEY, permissions),
	);
}

export function AuthRefreshJwtGuard(): any {
	return applyDecorators(
		ApiBearerAuth('refreshToken'),
		ResponseDoc({
			httpStatus: HttpStatus.UNAUTHORIZED,
			messagePath: 'http.clientError.unauthorized',
			statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_REFRESH_TOKEN_ERROR,
		}),
		UseGuards(JwtRefreshGuard),
	);
}
