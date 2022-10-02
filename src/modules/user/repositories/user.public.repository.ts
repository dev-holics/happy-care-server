import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';

@Injectable()
export class UserPublicRepository {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	createOne(createUserDto: UserCreateDto) {
		const createdUser = this.userRepository.create(createUserDto);
		return this.userRepository.save(createdUser);
	}
}
