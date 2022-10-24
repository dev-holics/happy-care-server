import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductModule } from 'src/modules/product/product.module';
import { ProductController } from 'src/modules/product/controllers';
import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { CityEntity } from 'src/modules/location/entities/city.entity';
import { LocationModule } from 'src/modules/location/location.module';
import { OriginModule } from 'src/modules/origin/origin.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { OrderModule } from 'src/modules/order/order.module';
import { CategoryController } from 'src/modules/category/controllers/category.controller';

@Module({
	controllers: [UserController, ProductController, CategoryController],
	providers: [],
	exports: [],
	imports: [
		UserModule,
		RoleModule,
		PermissionModule,
		CategoryModule,
		ProductModule,
		DistrictEntity,
		CityEntity,
		TerminusModule,
		LocationModule,
		OriginModule,
		TagModule,
		OrderModule,
		HttpModule,
	],
})
export class RoutesModule {}
