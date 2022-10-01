import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
	controllers: [UserController],
	providers: [],
	exports: [],
	imports: [
		UserModule,
		RoleModule,
		PermissionModule,
		TerminusModule,
		HttpModule,
	],
})
export class RoutesModule {}
