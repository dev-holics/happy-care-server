import {
	ProductConsignmentEntity,
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	ProductConsignmentRepository,
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
import { OrderConsignmentRepository } from 'src/modules/order/repositories';
import { OrderConsignmentEntity } from 'src/modules/order/entities';

@Module({
	imports: [
		LocationModule,
		TypeOrmModule.forFeature([
			ProductEntity,
			ProductLogEntity,
			ProductDetailEntity,
			ProductConsignmentEntity,
			OrderConsignmentEntity,
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
		ProductConsignmentRepository,
		OrderConsignmentRepository,
	],
	exports: [
		ProductRepository,
		ProductPublicRepository,
		ProductService,
		ProductPublicService,
		ProductDetailRepository,
		ProductDetailPublicService,
		ProductLogRepository,
		ProductConsignmentRepository,
		OrderConsignmentRepository,
	],
})
export class ProductModule {}
