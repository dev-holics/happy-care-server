import { LocationModule } from 'src/modules/location/location.module';
import { ProductModule } from 'src/modules/product/product.module';
import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller';
import { ProductPublicController } from 'src/modules/product/controllers';
import {
	DistrictPublicController,
	CityPublicController,
	BranchPublicController,
} from 'src/modules/location/controllers';

@Module({
	controllers: [
		UserPublicController,
		CategoryPublicController,
		ProductPublicController,
		DistrictPublicController,
		CityPublicController,
		BranchPublicController,
	],
	providers: [],
	exports: [],
	imports: [UserModule, CategoryModule, ProductModule, LocationModule],
})
export class RoutesPublicModule {}
