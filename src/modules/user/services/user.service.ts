import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { IUserCheckExist } from 'src/modules/user/interfaces/user.interface';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserLoginDto } from 'src/modules/user/dtos/user.login.dto';
import { ENUM_USER_STATUS_CODE_ERROR, ENUM_USER_STATUS_CODE_SUCCESS } from 'src/modules/user/constants';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
	constructor(
		private readonly authService: AuthService,
		private readonly userRepository: UserRepository,
	) { }

	async login(loginData: UserLoginDto) {
		const user: UserEntity = await this.userRepository.findOneByQuery({
			phoneNumber: loginData.phoneNumber,
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
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_OR_PASSWORD_NOT_MATCH_ERROR,
				message: 'user.error.userOrPasswordNotMatch',
			});
		} else if (!user.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
				message: 'user.error.inactive',
			});
		}

		const payload: UserPayloadSerialization =
			await this.payloadSerialization(user);
		const tokenType: string = await this.authService.getTokenType();
		const expiresIn: number =
			await this.authService.getAccessTokenExpirationTime();
		const rememberMe = !!loginData.rememberMe;

		const payloadAccessToken: Record<string, any> =
			await this.authService.createPayloadAccessToken(
				payload,
				rememberMe,
			);
		const payloadRefreshToken: Record<string, any> =
			await this.authService.createPayloadRefreshToken(
				payload.id,
				rememberMe,
				{
					loginDate: payloadAccessToken.loginDate,
				}
			);

		const accessToken: string = await this.authService.createAccessToken(
			user.id,
			payloadAccessToken,
		);

		const refreshToken: string = await this.authService.createRefreshToken(
			user.id,
			payloadRefreshToken,
			{ rememberMe },
		);

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
		const user: UserEntity = await this.userRepository.findOneByQuery({
			id: refreshData.id
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
		}

		const payload: UserPayloadSerialization =
			await this.payloadSerialization(user);
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

	async checkExist(
		phoneNumber: string,
	): Promise<IUserCheckExist> {
		const existUser: UserEntity = await this.userRepository.findOneByQuery({
			phoneNumber,
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
