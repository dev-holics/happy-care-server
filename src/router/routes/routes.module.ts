import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductModule } from 'src/modules/product/product.module';
import { CategoryController } from 'src/modules/category/controllers/category.controller';
import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { CityEntity } from 'src/modules/location/entities/city.entity';
import { LocationModule } from 'src/modules/location/location.module';

@Module({
	controllers: [CategoryController, UserController],
	providers: [],
	exports: [],
	imports: [
		CategoryModule,
		ProductModule,
		UserModule,
		RoleModule,
		PermissionModule,
		DistrictEntity,
		CityEntity,
		TerminusModule,
		LocationModule,
		HttpModule,
	],
})
export class RoutesModule {}
