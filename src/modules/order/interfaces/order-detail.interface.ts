import {
	OrderConsignmentEntity,
	OrderEntity,
} from 'src/modules/order/entities';

export interface IOrderDetailEntity {
	quantity: number;
	orderConsignments: OrderConsignmentEntity[];
	order: OrderEntity;
}
