import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoleSeed } from 'src/migrations/seeds/role.seed';
import { PermissionSeed } from 'src/migrations/seeds/permission.seed';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { UserSeed } from 'src/migrations/seeds/user.seed';
import { HttpModule } from '@nestjs/axios';
import { LocationSeed } from './seeds/location.seed';
import { LocationModule } from 'src/modules/location/location.module';

@Module({
	imports: [
		HttpModule,
		LocationModule,
		CommonModule,
		CommandModule,
		UserModule,
		RoleModule,
		PermissionModule,
	],
	providers: [RoleSeed, PermissionSeed, UserSeed, LocationSeed],
	exports: [],
})
export class MigrationModule {}
