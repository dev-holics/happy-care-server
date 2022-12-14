import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
	OrderConsignmentEntity,
	OrderDetailEntity,
	OrderDiscountEntity,
	OrderEntity,
	OrderPaymentEntity,
} from 'src/modules/order/entities';
import {
	OrderAdminRepository,
	OrderConsignmentRepository,
	OrderDetailRepository,
	OrderDiscountRepository,
	OrderPaymentRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import { OrderAdminService, OrderService } from 'src/modules/order/services';
import { UserEntity } from 'src/modules/user/entities';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import {
	ProductConsignmentEntity,
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import {
	ProductConsignmentRepository,
	ProductDetailRepository,
	ProductLogRepository,
	ProductRepository,
} from 'src/modules/product/repositories';
import { ProductService } from 'src/modules/product/services';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			OrderDetailEntity,
			OrderDiscountEntity,
			OrderEntity,
			OrderPaymentEntity,
			OrderConsignmentEntity,
			UserEntity,
			ProductLogEntity,
			ProductDetailEntity,
			ProductEntity,
			ProductConsignmentEntity,
		]),
	],
	providers: [
		OrderAdminRepository,
		OrderAdminService,
		OrderDetailRepository,
		OrderDiscountRepository,
		OrderRepository,
		OrderPaymentRepository,
		OrderService,
		OrderConsignmentRepository,
		UserRepository,
		ProductLogRepository,
		ProductDetailRepository,
		ProductRepository,
		ProductService,
		ProductConsignmentRepository,
	],
	exports: [
		OrderAdminRepository,
		OrderAdminService,
		OrderDetailRepository,
		OrderDiscountRepository,
		OrderRepository,
		OrderPaymentRepository,
		OrderService,
		OrderConsignmentRepository,
	],
})
export class OrderModule {}
