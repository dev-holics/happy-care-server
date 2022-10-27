import { ProductModule } from 'src/modules/product/product.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { Module } from '@nestjs/common';
import { PermissionAdminController } from 'src/modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { CartAdminController } from 'src/modules/cart/controllers/cart.admin.controller';
import { ProductAdminController } from 'src/modules/product/controllers';

@Module({
	controllers: [
		PermissionAdminController,
		RoleAdminController,
		CartAdminController,
		ProductAdminController,
	],
	providers: [],
	exports: [],
	imports: [PermissionModule, RoleModule, CartModule, ProductModule],
})
export class RoutesAdminModule {}
