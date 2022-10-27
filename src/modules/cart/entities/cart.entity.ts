import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { snakeCase } from 'change-case';
import { ICartEntity } from 'src/modules/cart/interfaces';
import { CartItemEntity } from '.';

@Entity('carts')
export class CartEntity extends DatabaseEntityAbstract implements ICartEntity {
	@OneToOne(() => UserEntity)
	@JoinColumn({ name: snakeCase('userId'), referencedColumnName: 'id' })
	user: UserEntity;

	@OneToMany(() => CartItemEntity, cartItem => cartItem.cart, {
		cascade: true,
	})
	cartItems: CartItemEntity[];
}
