import { LocationModule } from 'src/modules/location/location.module';
import { ProductModule } from 'src/modules/product/product.module';
import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller';
import {
	ProductDetailPublicController,
	ProductPublicController,
} from 'src/modules/product/controllers';
import {
	DistrictPublicController,
	CityPublicController,
	BranchPublicController,
} from 'src/modules/location/controllers';
import { OriginModule } from 'src/modules/origin/origin.module';
import {
	OriginPublicController,
	TrademarkPublicController,
} from 'src/modules/origin/controllers';
import { FeedbackModule } from 'src/modules/feedback/feedback.module';
import { FeedbackPublicController } from 'src/modules/feedback/controllers';

@Module({
	controllers: [
		UserPublicController,
		CategoryPublicController,
		ProductPublicController,
		ProductDetailPublicController,
		DistrictPublicController,
		CityPublicController,
		BranchPublicController,
		OriginPublicController,
		TrademarkPublicController,
		FeedbackPublicController,
	],
	providers: [],
	exports: [],
	imports: [
		UserModule,
		CategoryModule,
		ProductModule,
		LocationModule,
		OriginModule,
		FeedbackModule,
	],
})
export class RoutesPublicModule {}
