import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { PermissionAdminService } from 'src/modules/permission/services/permission.admin.service';

@Module({
	controllers: [],
	providers: [PermissionAdminService, PermissionRepository],
	exports: [PermissionAdminService, PermissionRepository],
	imports: [TypeOrmModule.forFeature([PermissionEntity])],
})
export class PermissionModule {}
