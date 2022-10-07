import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyEntity } from 'src/common/auth/entities/auth.api-key.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class AuthApiKeyRepository extends DatabaseRepositoryAbstract<ApiKeyEntity> {
	constructor(
		@InjectRepository(ApiKeyEntity)
		private apiKeyRepository: Repository<ApiKeyEntity>,
	) {
		super(apiKeyRepository);
	}
}
