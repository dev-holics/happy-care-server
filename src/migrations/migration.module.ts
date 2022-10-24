import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoleSeed } from 'src/migrations/seeds/role.seed';
import { PermissionSeed } from 'src/migrations/seeds/permission.seed';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { UserSeed } from 'src/migrations/seeds/user.seed';
import { LocationSeed } from './seeds/location.seed';
import { HttpModule } from '@nestjs/axios';
import { LocationModule } from 'src/modules/location/location.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategorySeed } from 'src/migrations/seeds/category.seed';

@Module({
	imports: [
		HttpModule,
		CategoryModule,
		LocationModule,
		CommonModule,
		CommandModule,
		UserModule,
		RoleModule,
		PermissionModule,
		CategoryModule,
	],
	providers: [CategorySeed, RoleSeed, PermissionSeed, UserSeed, LocationSeed],
	exports: [],
})
export class MigrationModule {}
