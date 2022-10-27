import { ProductEntity } from 'src/modules/product/entities';
import { CartEntity } from 'src/modules/cart/entities';

export interface ICartItemEntity {
	quantity: number;
	cart: CartEntity;
	product: ProductEntity;
}
