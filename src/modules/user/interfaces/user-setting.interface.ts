import { OrderEntity } from 'src/modules/order/entities';
import { UserEntity } from 'src/modules/user/entities';

export interface IUserSetting {
	address: string;

	phoneNumber: number;

	orders: OrderEntity[];

	user: UserEntity;
}
