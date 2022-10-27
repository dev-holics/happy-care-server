import { CategoryModule } from 'src/modules/category/category.module';
import { LocationModule } from 'src/modules/location/location.module';
import { ProductModule } from 'src/modules/product/product.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { Module } from '@nestjs/common';
import { PermissionAdminController } from 'src/modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { CartAdminController } from 'src/modules/cart/controllers/cart.admin.controller';
import { ProductAdminController } from 'src/modules/product/controllers';
import { BranchAdminController } from 'src/modules/location/controllers';
import { CategoryAdminController } from 'src/modules/category/controllers/category.controller';

@Module({
	controllers: [
		PermissionAdminController,
		RoleAdminController,
		CartAdminController,
		ProductAdminController,
		BranchAdminController,
		CategoryAdminController,
	],
	providers: [],
	exports: [],
	imports: [
		PermissionModule,
		RoleModule,
		CartModule,
		ProductModule,
		LocationModule,
		CategoryModule,
	],
})
export class RoutesAdminModule {}
