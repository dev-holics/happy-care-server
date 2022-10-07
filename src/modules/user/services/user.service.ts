import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IUserCheckExist } from 'src/modules/user/interfaces/user.interface';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserLoginDto } from 'src/modules/user/dtos/user.login.dto';
import {
	ENUM_USER_STATUS_CODE_ERROR,
	ENUM_USER_STATUS_CODE_SUCCESS,
} from 'src/modules/user/constants';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants';

@Injectable()
export class UserService {
	constructor(
		private readonly authService: AuthService,
		private readonly userRepository: UserRepository,
	) {}

	async login(loginData: UserLoginDto) {
		const user: UserEntity = await this.userRepository.findOne({
			where: {
				phoneNumber: loginData.phoneNumber,
			},
			options: {
				relations: {
					role: {
						permissions: true,
					},
				},
			},
		});

		if (!user) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
				message: 'user.error.notFound',
			});
		}

		const authValidation: boolean = await this.authService.validateUser(
			loginData.password,
			user.password,
		);

		if (!authValidation) {
			throw new BadRequestException({
				statusCode:
					ENUM_USER_STATUS_CODE_ERROR.USER_OR_PASSWORD_NOT_MATCH_ERROR,
				message: 'user.error.userOrPasswordNotMatch',
			});
		} else if (!user.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
				message: 'user.error.inactive',
			});
		}

		const payload: UserPayloadSerialization = await this.payloadSerialization(
			user,
		);
		const tokenType: string = await this.authService.getTokenType();
		const expiresIn: number =
			await this.authService.getAccessTokenExpirationTime();
		const rememberMe = !!loginData.rememberMe;

		const payloadAccessToken: Record<string, any> =
			await this.authService.createPayloadAccessToken(payload, rememberMe);
		const payloadRefreshToken: Record<string, any> =
			await this.authService.createPayloadRefreshToken(payload.id, rememberMe, {
				loginDate: payloadAccessToken.loginDate,
			});

		await this.authService.clearOldAuthTokens(user);
		const [accessToken, refreshToken] = await Promise.all([
			this.authService.createAccessToken(user, payloadAccessToken),
			this.authService.createRefreshToken(user, payloadRefreshToken, {
				rememberMe,
			}),
		]);

		return {
			metadata: {
				statusCode: ENUM_USER_STATUS_CODE_SUCCESS.USER_LOGIN_SUCCESS,
			},
			tokenType,
			expiresIn,
			accessToken,
			refreshToken,
		};
	}

	async refresh(refreshData: Record<string, any>, refreshToken: string) {
		const user: UserEntity = await this.userRepository.findOne({
			where: {
				id: refreshData.id,
			},
			options: {
				relations: {
					role: true,
				},
			},
		});

		if (!user) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
				message: 'user.error.notFound',
			});
		} else if (!user.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
				message: 'user.error.inactive',
			});
		} else if (!user.role.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_INACTIVE_ERROR,
				message: 'role.error.inactive',
			});
		}

		const payload: UserPayloadSerialization = await this.payloadSerialization(
			user,
		);
		const tokenType: string = await this.authService.getTokenType();
		const expiresIn: number =
			await this.authService.getAccessTokenExpirationTime();

		const payloadAccessToken: Record<string, any> =
			await this.authService.createPayloadAccessToken(
				payload,
				refreshData.rememberMe,
				{
					loginDate: refreshData.loginDate,
				},
			);

		await this.authService.clearOldAuthTokens(user, true);
		const accessToken: string = await this.authService.createAccessToken(
			refreshData.id,
			payloadAccessToken,
		);

		return {
			tokenType,
			expiresIn,
			accessToken,
			refreshToken,
		};
	}

	async checkExist(phoneNumber: string): Promise<IUserCheckExist> {
		const existUser: UserEntity = await this.userRepository.findOne({
			where: {
				phoneNumber,
			},
		});

		return {
			phoneNumber: !!existUser,
		};
	}

	async payloadSerialization(
		data: UserEntity,
	): Promise<UserPayloadSerialization> {
		return plainToInstance(UserPayloadSerialization, data);
	}
}
