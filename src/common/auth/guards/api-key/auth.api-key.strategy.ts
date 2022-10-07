import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant';
import { IAuthApiRequestHashedData } from 'src/common/auth/interfaces/auth.interface';
import { HelperNumberService } from 'src/common/helper/services/helper.number.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ApiKeyEntity } from 'src/common/auth/entities/auth.api-key.entity';
import { AuthApiKeyRepository } from 'src/common/auth/repositories/auth.api-key.repository';
import { AuthApiService } from 'src/common/auth/services/auth.api.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
	constructor(
		private readonly apiKeyRepository: AuthApiKeyRepository,
		private readonly authApiService: AuthApiService,
		private readonly helperNumberService: HelperNumberService,
	) {
		super(
			{ header: 'X-API-KEY', prefix: '' },
			true,
			async (
				apiKey: string,
				verified: (
					error: Error,
					user?: Record<string, any>,
					info?: string | number,
				) => Promise<void>,
				req: IRequestApp,
			) => this.validate(apiKey, verified, req),
		);
	}

	// you can change the logic
	// difference app - difference logic
	async validate(
		apiKey: string,
		verified: (
			error: Error,
			user?: ApiKeyEntity,
			info?: string | number,
		) => Promise<void>,
		req: any,
	) {
		const xApiKey: string[] = apiKey.split(':');
		const key = xApiKey[0];
		const encrypted = xApiKey[1];

		const authApi: ApiKeyEntity = await this.apiKeyRepository.findOne({
			where: {
				key,
			},
		});

		if (!authApi) {
			await verified(
				null,
				null,
				`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_NOT_FOUND_ERROR}`,
			);
		} else if (!authApi.isActive) {
			await verified(
				null,
				null,
				`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INACTIVE_ERROR}`,
			);
		} else {
			const decrypted: IAuthApiRequestHashedData =
				await this.authApiService.decryptApiKey(
					encrypted,
					authApi.encryptionKey,
					authApi.passphrase,
				);

			const hasKey: boolean =
				'key' in decrypted && 'timestamp' in decrypted && 'hash' in decrypted;

			const timestamp: number = this.helperNumberService.create(
				req.headers['x-timestamp'] as string,
			);

			if (!hasKey) {
				await verified(
					null,
					null,
					`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_SCHEMA_INVALID_ERROR}`,
				);
			} else if (key !== decrypted.key) {
				await verified(
					null,
					null,
					`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INVALID_ERROR}`,
				);
			} else if (!timestamp || timestamp !== decrypted.timestamp) {
				await verified(
					new Error(
						`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_TIMESTAMP_NOT_MATCH_WITH_REQUEST_ERROR}`,
					),
				);
			} else {
				const validateApiKey: boolean =
					await this.authApiService.validateHashApiKey(
						decrypted.hash,
						authApi.hash,
					);
				if (!validateApiKey) {
					await verified(
						null,
						null,
						`${ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INVALID_ERROR}`,
					);
				}

				req.apiKey = {
					id: authApi.id,
					key: authApi.key,
					name: authApi.name,
				};
				await verified(null, authApi);
			}
		}
	}
}
