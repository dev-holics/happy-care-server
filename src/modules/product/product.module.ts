import {
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	ProductDetailRepository,
	ProductLogRepository,
	ProductPublicRepository,
	ProductRepository,
} from 'src/modules/product/repositories';
import {
	ProductDetailPublicService,
	ProductPublicService,
	ProductService,
} from 'src/modules/product/services';
import { CategoryModule } from 'src/modules/category/category.module';
import { LocationModule } from 'src/modules/location/location.module';

@Module({
	imports: [
		LocationModule,
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductLogEntity,
			ProductDetailEntity,
		]),
		forwardRef(() => CategoryModule),
	],
	providers: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
		ProductDetailPublicService,
		ProductLogRepository,
	],
	exports: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
		ProductDetailPublicService,
		ProductLogRepository,
	],
})
export class ProductModule {}
