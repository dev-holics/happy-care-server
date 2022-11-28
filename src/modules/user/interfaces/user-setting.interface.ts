import { OrderEntity } from 'src/modules/order/entities';
import { UserEntity } from 'src/modules/user/entities';

export interface IUserSetting {
	name: string;

	address: string;

	phoneNumber: string;

	orders: OrderEntity[];

	user: UserEntity;
}
