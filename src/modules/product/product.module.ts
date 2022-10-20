import {
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ProductService } from 'src/modules/product/services';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductLogEntity,
			ProductDetailEntity,
		]),
	],
	providers: [ProductRepository, ProductService],
	exports: [ProductRepository, ProductService],
})
export class ProductModule {}
