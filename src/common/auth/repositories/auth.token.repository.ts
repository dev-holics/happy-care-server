import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class AuthTokenRepository extends DatabaseRepositoryAbstract<TokenEntity> {
	constructor(
		@InjectRepository(TokenEntity)
		private tokenRepository: Repository<TokenEntity>,
	) {
		super(tokenRepository);
	}
}
