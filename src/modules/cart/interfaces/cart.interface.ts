import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CartItemEntity } from 'src/modules/cart/entities';

export interface ICartEntity {
	user: UserEntity;
	cartItems: CartItemEntity[];
}
