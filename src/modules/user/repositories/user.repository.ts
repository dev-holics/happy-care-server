import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepository {
	queryBuilder: SelectQueryBuilder<UserEntity>;

	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {
		this.queryBuilder = userRepository.createQueryBuilder();
	}

	findOneByQuery(whereOptions: Record<string, any>): Promise<UserEntity> {
		return this.userRepository.findOneBy(whereOptions);
	}

	async findOneWithRelations(
		whereOptions: Record<string, any>,
		relations: Record<string, any> = {},
	) {
		const users: UserEntity[] = await this.userRepository.find({
			relations,
			where: whereOptions,
			take: 1,
		});

		return users?.at(0);
	}

	createOne(entityData: QueryDeepPartialEntity<UserEntity>) {
		return this.userRepository.insert(entityData);
	}

	hardDelete(whereOptions: Record<string, any>) {
		return this.userRepository.delete(whereOptions);
	}
}
