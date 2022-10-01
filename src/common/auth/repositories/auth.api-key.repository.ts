import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyEntity } from 'src/common/auth/entities/auth.api-key.entity';

@Injectable()
export class AuthApiKeyRepository {
	constructor(
		@InjectRepository(ApiKeyEntity)
		private apiKeyRepository: Repository<ApiKeyEntity>,
	) {}

	findOneByQuery(where: Record<string, any>): Promise<ApiKeyEntity> {
		return this.apiKeyRepository.findOneBy(where);
	}
}
