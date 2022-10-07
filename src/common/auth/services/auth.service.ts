import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LessThan } from 'typeorm';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { AuthTokenRepository } from 'src/common/auth/repositories/auth.token.repository';
import { IAuthService } from 'src/common/auth/interfaces/auth.service.interface';
import {
	IAuthPassword,
	IAuthPayloadOptions,
	IAuthRefreshTokenOptions,
} from 'src/common/auth/interfaces/auth.interface';
import { ENUM_AUTH_TOKEN_TYPES } from 'src/common/auth/constants';
import { RedisService } from 'src/common/redis/services/redis.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
	private readonly accessTokenSecretKey: string;

	private readonly accessTokenExpirationTime: number;

	private readonly accessTokenNotBeforeExpirationTime: number;

	private readonly refreshTokenSecretKey: string;

	private readonly refreshTokenExpirationTime: number;

	private readonly refreshTokenExpirationTimeRememberMe: number;

	private readonly refreshTokenNotBeforeExpirationTime: number;

	private readonly prefixAuthorization: string;

	private readonly audience: string;

	private readonly issuer: string;

	private readonly subject: string;

	constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenRepository: AuthTokenRepository,
		private readonly helperHashService: HelperHashService,
		private readonly helperDateService: HelperDateService,
		private readonly helperEncryptionService: HelperEncryptionService,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {
		this.accessTokenSecretKey = this.configService.get<string>(
			'auth.jwt.accessToken.secretKey',
		);
		this.accessTokenExpirationTime = Number(
			this.configService.get<string>('auth.jwt.accessToken.expirationTime'),
		);
		this.accessTokenNotBeforeExpirationTime = this.configService.get<number>(
			'auth.jwt.accessToken.notBeforeExpirationTime',
		);

		this.refreshTokenSecretKey = this.configService.get<string>(
			'auth.jwt.refreshToken.secretKey',
		);
		this.refreshTokenExpirationTime = Number(
			this.configService.get<string>('auth.jwt.refreshToken.expirationTime'),
		);
		this.refreshTokenExpirationTimeRememberMe = Number(
			this.configService.get<string>(
				'auth.jwt.refreshToken.expirationTimeRememberMe',
			),
		);
		this.refreshTokenNotBeforeExpirationTime = Number(
			this.configService.get<string>(
				'auth.jwt.refreshToken.notBeforeExpirationTime',
			),
		);

		this.prefixAuthorization = this.configService.get<string>(
			'auth.jwt.prefixAuthorization',
		);
		this.subject = this.configService.get<string>('auth.jwt.subject');
		this.audience = this.configService.get<string>('auth.jwt.audience');
		this.issuer = this.configService.get<string>('auth.jwt.issuer');
	}

	async createAccessToken(
		user: UserEntity,
		payload: Record<string, any>,
	): Promise<string> {
		const accessToken = this.helperEncryptionService.jwtEncrypt(payload, {
			secretKey: this.accessTokenSecretKey,
			expiredIn: this.accessTokenExpirationTime,
			notBefore: this.accessTokenNotBeforeExpirationTime,
			audience: this.audience,
			issuer: this.issuer,
			subject: this.subject,
		});

		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.tokenRepository.createOne({
				data: {
					user,
					token: accessToken,
					type: ENUM_AUTH_TOKEN_TYPES.ACCESS_TOKEN,
					expiredTime: this.helperDateService.create({
						date: new Date(Date.now() + this.accessTokenExpirationTime),
					}),
				},
			});
		} catch (err: any) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}

		return accessToken;
	}

	async validateAccessToken(token: string): Promise<boolean> {
		return this.helperEncryptionService.jwtVerify(token, {
			secretKey: this.accessTokenSecretKey,
			audience: this.audience,
			issuer: this.issuer,
			subject: this.subject,
		});
	}

	async payloadAccessToken(token: string): Promise<Record<string, any>> {
		return this.helperEncryptionService.jwtDecrypt(token);
	}

	async createRefreshToken(
		user: UserEntity,
		payload: Record<string, any>,
		options?: IAuthRefreshTokenOptions,
	): Promise<string> {
		const refreshToken = this.helperEncryptionService.jwtEncrypt(payload, {
			secretKey: this.refreshTokenSecretKey,
			expiredIn:
				options && options.rememberMe
					? this.refreshTokenExpirationTimeRememberMe
					: this.refreshTokenExpirationTime,
			notBefore:
				options?.notBeforeExpirationTime ||
				this.refreshTokenNotBeforeExpirationTime,
			audience: this.audience,
			issuer: this.issuer,
			subject: this.subject,
		});

		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.tokenRepository.createOne({
				data: {
					user,
					token: refreshToken,
					type: ENUM_AUTH_TOKEN_TYPES.REFRESH_TOKEN,
					expiredTime: this.helperDateService.create({
						date: new Date(Date.now() + this.refreshTokenExpirationTime),
					}),
				},
			});
		} catch (err: any) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}

		return refreshToken;
	}

	async validateRefreshToken(token: string): Promise<boolean> {
		return this.helperEncryptionService.jwtVerify(token, {
			secretKey: this.refreshTokenSecretKey,
			audience: this.audience,
			issuer: this.issuer,
			subject: this.subject,
		});
	}

	async payloadRefreshToken(token: string): Promise<Record<string, any>> {
		return this.helperEncryptionService.jwtDecrypt(token);
	}

	async createPayloadAccessToken(
		data: Record<string, any>,
		rememberMe: boolean,
		options?: IAuthPayloadOptions,
	): Promise<Record<string, any>> {
		return {
			...data,
			rememberMe,
			loginDate:
				options && options.loginDate
					? options.loginDate
					: this.helperDateService.create(),
		};
	}

	async createPayloadRefreshToken(
		_id: string,
		rememberMe: boolean,
		options?: IAuthPayloadOptions,
	): Promise<Record<string, any>> {
		return {
			_id,
			rememberMe,
			loginDate: options && options.loginDate ? options.loginDate : undefined,
		};
	}

	async getAccessTokenExpirationTime(): Promise<number> {
		return this.accessTokenExpirationTime;
	}

	async getRefreshTokenExpirationTime(rememberMe?: boolean): Promise<number> {
		return rememberMe
			? this.refreshTokenExpirationTime
			: this.refreshTokenExpirationTimeRememberMe;
	}

	async validateUser(
		passwordString: string,
		passwordHash: string,
	): Promise<boolean> {
		return this.helperHashService.bcryptCompare(passwordString, passwordHash);
	}

	async createPassword(password: string): Promise<IAuthPassword> {
		const saltLength: number = this.configService.get<number>(
			'auth.password.saltLength',
		);

		const salt: string = this.helperHashService.randomSalt(saltLength);

		const passwordHash = this.helperHashService.bcrypt(password, salt);
		return {
			passwordHash,
			salt,
		};
	}

	async getTokenType(): Promise<string> {
		return this.prefixAuthorization;
	}

	async getIssuer(): Promise<string> {
		return this.issuer;
	}

	async getAudience(): Promise<string> {
		return this.audience;
	}

	async getSubject(): Promise<string> {
		return this.subject;
	}

	clearOldAuthTokens(user: UserEntity, justAccessToken = false) {
		let criteria: Record<string, any> = {
			user,
			expiredTime: LessThan(this.helperDateService.now()),
		};

		if (justAccessToken) {
			criteria = {
				...criteria,
				type: ENUM_AUTH_TOKEN_TYPES.ACCESS_TOKEN,
			};
		}

		return this.tokenRepository.updateMany({
			criteria,
			data: {
				isActive: false,
				deletedAt: this.helperDateService.create({
					date: new Date(),
				}),
			},
		});
	}
}
