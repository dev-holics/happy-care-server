import { Module } from '@nestjs/common';
import { PermissionAdminController } from 'src/modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
	controllers: [PermissionAdminController],
	providers: [],
	exports: [],
	imports: [PermissionModule],
})
export class RoutesAdminModule {}
