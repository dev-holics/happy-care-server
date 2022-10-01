import { Injectable } from '@nestjs/common';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { ConfigService } from '@nestjs/config';
import { IAuthApiRequestHashedData } from 'src/common/auth/interfaces/auth.interface';

@Injectable()
export class AuthApiService {
	private readonly env: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly helperEncryptionService: HelperEncryptionService,
		private readonly helperHashService: HelperHashService,
		private readonly helperStringService: HelperStringService,
	) {
		this.env = configService.get<string>('app.env');
	}

	async createKey(): Promise<string> {
		return this.helperStringService.random(25, {
			safe: false,
			upperCase: true,
			prefix: `${this.env}_`,
		});
	}

	async createEncryptionKey(): Promise<string> {
		return this.helperStringService.random(15, {
			safe: false,
			upperCase: true,
			prefix: `${this.env}_`,
		});
	}

	async createSecret(): Promise<string> {
		return this.helperStringService.random(35, {
			safe: false,
			upperCase: true,
		});
	}

	async createPassphrase(): Promise<string> {
		return this.helperStringService.random(16, {
			safe: true,
		});
	}

	async createHashApiKey(key: string, secret: string): Promise<string> {
		return this.helperHashService.sha256(`${key}:${secret}`);
	}

	async validateHashApiKey(
		hashFromRequest: string,
		hash: string,
	): Promise<boolean> {
		return this.helperHashService.sha256Compare(hashFromRequest, hash);
	}

	async decryptApiKey(
		encryptedApiKey: string,
		encryptionKey: string,
		passphrase: string,
	): Promise<IAuthApiRequestHashedData> {
		const decrypted = this.helperEncryptionService.aes256Decrypt(
			encryptedApiKey,
			encryptionKey,
			passphrase,
		);

		return JSON.parse(decrypted);
	}

	async encryptApiKey(
		data: IAuthApiRequestHashedData,
		encryptionKey: string,
		passphrase: string,
	): Promise<string> {
		return this.helperEncryptionService.aes256Encrypt(
			data,
			encryptionKey,
			passphrase,
		);
	}
}
