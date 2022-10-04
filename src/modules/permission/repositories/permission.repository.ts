import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PermissionRepository {
	private findOptionsDefault = {
		isActive: true,
		deletedAt: null,
	};

	constructor(
		@InjectRepository(PermissionEntity)
		private permissionRepository: Repository<PermissionEntity>,
	) {}

	findOneByQuery(whereOptions: Record<string, any>): Promise<PermissionEntity> {
		return this.permissionRepository.findOneBy(whereOptions);
	}

	findAll(): Promise<PermissionEntity[]> {
		return this.permissionRepository.find({
			where: this.findOptionsDefault,
			select: ['id', 'name', 'description', 'module', 'isActive', 'code'],
		});
	}

	createOne(entityData: QueryDeepPartialEntity<PermissionEntity>) {
		return this.permissionRepository.insert(entityData);
	}

	hardDelete(whereOptions: Record<string, any>) {
		return this.permissionRepository.delete(whereOptions);
	}
}
