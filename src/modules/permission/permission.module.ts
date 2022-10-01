import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';

@Module({
	controllers: [],
	providers: [PermissionRepository],
	exports: [PermissionRepository],
	imports: [TypeOrmModule.forFeature([PermissionEntity])],
})
export class PermissionModule {}
