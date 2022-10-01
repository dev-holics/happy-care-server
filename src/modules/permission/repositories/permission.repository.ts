import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

@Injectable()
export class PermissionRepository {
	private findOptions = {
		isActive: true,
		deletedAt: null,
	};

	constructor(
		@InjectRepository(PermissionEntity)
		private permissionRepository: Repository<PermissionEntity>,
	) {}

	findOneByQuery(where: Record<string, any>): Promise<PermissionEntity> {
		return this.permissionRepository.findOneBy(where);
	}

	findAll(): Promise<PermissionEntity[]> {
		return this.permissionRepository.find({
			where: this.findOptions,
			select: ['id', 'name', 'description', 'isActive', 'code'],
		});
	}
}
