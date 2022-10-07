import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class RoleRepository extends DatabaseRepositoryAbstract<RoleEntity> {
	constructor(
		@InjectRepository(RoleEntity)
		private roleRepository: Repository<RoleEntity>,
	) {
		super(roleRepository);
	}
}
