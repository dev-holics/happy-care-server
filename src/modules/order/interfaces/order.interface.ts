import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
	OrderDetailEntity,
	OrderDiscountEntity,
} from 'src/modules/order/entities';
import { BranchEntity } from 'src/modules/location/entities';

export interface IOrderEntity {
	orderCode: string;
	paymentType: string;
	orderType: string;
	status: string;
	totalPrice: number;
	orderDetails: OrderDetailEntity[];
	orderDiscounts: OrderDiscountEntity[];
	customer: UserEntity;
	pharmacist: UserEntity;
	branch: BranchEntity;
}
