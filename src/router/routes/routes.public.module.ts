import { ProductModule } from 'src/modules/product/product.module';
import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller';
import { ProductPublicController } from 'src/modules/product/controllers';

@Module({
	controllers: [
		UserPublicController,
		CategoryPublicController,
		ProductPublicController,
	],
	providers: [],
	exports: [],
	imports: [UserModule, CategoryModule, ProductModule],
})
export class RoutesPublicModule {}
