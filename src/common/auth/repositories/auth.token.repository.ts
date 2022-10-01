import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { AuthCreateTokenDto } from 'src/common/auth/dtos/auth.create-token.dto';

@Injectable()
export class AuthTokenRepository {
	constructor(
		@InjectRepository(TokenEntity)
		private tokenRepository: Repository<TokenEntity>,
	) { }

	createOne(createTokenDto: AuthCreateTokenDto): Promise<TokenEntity> {
		const createdUser = this.tokenRepository.create(createTokenDto);
		return this.tokenRepository.save(createdUser);
	}
}
