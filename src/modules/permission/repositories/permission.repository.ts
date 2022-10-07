import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class PermissionRepository extends DatabaseRepositoryAbstract<PermissionEntity> {
	constructor(
		@InjectRepository(PermissionEntity)
		private permissionRepository: Repository<PermissionEntity>,
	) {
		super(permissionRepository);
	}
}
