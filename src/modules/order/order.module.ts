import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
	OrderDetailEntity,
	OrderDiscountEntity,
	OrderEntity,
	OrderPaymentEntity,
} from 'src/modules/order/entities';
import {
	OrderAdminRepository,
	OrderDetailRepository,
	OrderDiscountRepository,
	OrderPaymentRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import { OrderAdminService, OrderService } from 'src/modules/order/services';
import { UserEntity } from 'src/modules/user/entities';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import {
	ProductDetailEntity,
	ProductEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';
import {
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
			UserEntity,
			ProductLogEntity,
			ProductDetailEntity,
			ProductEntity,
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
		UserRepository,
		ProductLogRepository,
		ProductDetailRepository,
		ProductRepository,
		ProductService,
	],
	exports: [
		OrderAdminRepository,
		OrderAdminService,
		OrderDetailRepository,
		OrderDiscountRepository,
		OrderRepository,
		OrderPaymentRepository,
		OrderService,
	],
})
export class OrderModule {}
