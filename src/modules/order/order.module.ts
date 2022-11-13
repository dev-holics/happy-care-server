import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
	OrderDetailEntity,
	OrderDiscountEntity,
	OrderEntity,
	OrderPaymentEntity,
} from 'src/modules/order/entities';
import {
	OrderDetailRepository,
	OrderDiscountRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import { OrderService } from 'src/modules/order/services';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			OrderDetailEntity,
			OrderDiscountEntity,
			OrderEntity,
			OrderPaymentEntity,
		]),
	],
	providers: [
		OrderDetailRepository,
		OrderDiscountRepository,
		OrderRepository,
		OrderService,
	],
	exports: [
		OrderDetailRepository,
		OrderDiscountRepository,
		OrderRepository,
		OrderService,
	],
})
export class OrderModule {}
