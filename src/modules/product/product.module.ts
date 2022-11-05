import {
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	ProductDetailRepository,
	ProductPublicRepository,
	ProductRepository,
} from 'src/modules/product/repositories';
import {
	ProductPublicService,
	ProductService,
} from 'src/modules/product/services';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductLogRepository } from 'src/modules/product/repositories/product-log.repository';

@Module({
	imports: [
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
		ProductLogRepository,
	],
	exports: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
		ProductLogRepository,
	],
})
export class ProductModule {}
