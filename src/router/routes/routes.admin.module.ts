import { Module } from '@nestjs/common';
import { PermissionAdminController } from 'src/modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';

@Module({
	controllers: [PermissionAdminController, RoleAdminController],
	providers: [],
	exports: [],
	imports: [PermissionModule, RoleModule],
})
export class RoutesAdminModule {}
