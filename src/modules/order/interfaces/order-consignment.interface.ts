import { ProductConsignmentEntity } from 'src/modules/product/entities';
import { OrderDetailEntity } from 'src/modules/order/entities';

export interface IOrderConsignmentEntity {
	quantity: number;
	orderDetail: OrderDetailEntity;
	productConsignment: ProductConsignmentEntity;
}
