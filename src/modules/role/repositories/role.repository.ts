import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class RoleRepository {
	constructor(
		@InjectRepository(RoleEntity)
		private roleRepository: Repository<RoleEntity>,
	) {}

	getRepository(): Repository<RoleEntity> {
		return this.roleRepository;
	}

	findOneByQuery(whereOptions: Record<string, any>): Promise<RoleEntity> {
		return this.roleRepository.findOneBy(whereOptions);
	}

	updateOne(
		whereOptions: Record<string, any>,
		data: QueryDeepPartialEntity<RoleEntity>,
	) {
		return this.roleRepository.update(whereOptions, data);
	}

	createOne(entityData: QueryDeepPartialEntity<RoleEntity>) {
		return this.roleRepository.insert(entityData);
	}

	hardDelete(whereOptions: Record<string, any>) {
		return this.roleRepository.delete(whereOptions);
	}
}
