import {
	IAuthPassword,
	IAuthPayloadOptions,
	IAuthRefreshTokenOptions,
} from 'src/common/auth/interfaces/auth.interface';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface IAuthService {
	createAccessToken(
		user: UserEntity,
		payload: Record<string, any>,
	): Promise<string>;

	validateAccessToken(token: string): Promise<boolean>;

	payloadAccessToken(token: string): Promise<Record<string, any>>;

	createRefreshToken(
		user: UserEntity,
		payload: Record<string, any>,
		options?: IAuthRefreshTokenOptions,
	): Promise<string>;

	validateRefreshToken(token: string): Promise<boolean>;

	payloadRefreshToken(token: string): Promise<Record<string, any>>;

	createPayloadAccessToken(
		data: Record<string, any>,
		rememberMe: boolean,
		options?: IAuthPayloadOptions,
	): Promise<Record<string, any>>;

	createPayloadRefreshToken(
		_id: string,
		rememberMe: boolean,
		options?: IAuthPayloadOptions,
	): Promise<Record<string, any>>;

	getAccessTokenExpirationTime(): Promise<number>;

	getRefreshTokenExpirationTime(rememberMe?: boolean): Promise<number>;

	validateUser(passwordString: string, passwordHash: string): Promise<boolean>;

	createPassword(password: string): Promise<IAuthPassword>;

	getTokenType(): Promise<string>;

	getIssuer(): Promise<string>;

	getAudience(): Promise<string>;

	getSubject(): Promise<string>;

	clearOldAuthTokens(user: UserEntity, justAccessToken: boolean): Promise<any>;
}
