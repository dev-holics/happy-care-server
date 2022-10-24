import {
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import { Module } from '@nestjs/common';
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

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductLogEntity,
			ProductDetailEntity,
		]),
		CategoryModule,
	],
	providers: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
	],
	exports: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
	],
})
export class ProductModule {}
