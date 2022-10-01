import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Injectable()
export class RoleRepository {
	constructor(
		@InjectRepository(RoleEntity)
		private roleRepository: Repository<RoleEntity>,
	) { }

	findOneByQuery(where: Record<string, any>): Promise<RoleEntity> {
		return this.roleRepository.findOneBy(where);
	}
}
