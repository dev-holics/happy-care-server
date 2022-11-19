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

@Module({
	imports: [
		TypeOrmModule.forFeature([
			OrderDetailEntity,
			OrderDiscountEntity,
			OrderEntity,
			OrderPaymentEntity,
			UserEntity,
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
