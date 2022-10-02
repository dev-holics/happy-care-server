import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	findOneByQuery(where: Record<string, any>): Promise<UserEntity> {
		return this.userRepository.findOneBy(where);
	}
}
