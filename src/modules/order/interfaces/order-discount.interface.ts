import { OrderEntity } from 'src/modules/order/entities';

export interface IOrderDiscountEntity {
	code: string;
	discount: number;
	description: string;
	order: OrderEntity;
}
