import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { RoleAdminService } from 'src/modules/role/services/role.admin.service';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
	controllers: [],
	providers: [RoleRepository, RoleAdminService],
	exports: [RoleRepository, RoleAdminService],
	imports: [TypeOrmModule.forFeature([RoleEntity]), PermissionModule],
})
export class RoleModule {}
