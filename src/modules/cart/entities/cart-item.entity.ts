import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { ICartItemEntity } from 'src/modules/cart/interfaces';
import { CartEntity } from '.';

@Entity('cart_items')
export class CartItemEntity
	extends DatabaseEntityAbstract
	implements ICartItemEntity
{
	@Column({ type: 'int' })
	quantity: number;

	@ManyToOne(() => CartEntity, cart => cart.cartItems, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: snakeCase('cartId'), referencedColumnName: 'id' })
	cart: CartEntity;

	@ManyToOne(() => ProductEntity, product => product.cartItems)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;
}
