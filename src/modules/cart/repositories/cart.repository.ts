import { CartEntity } from 'src/modules/cart/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class CartRepository extends DatabaseRepositoryAbstract<CartEntity> {
	constructor(
		@InjectRepository(CartEntity)
		private cartRepository: Repository<CartEntity>,
	) {
		super(cartRepository);
	}

	async updateItems(cartId: string, items: any) {
		const myCart = await this.cartRepository.findOne({
			where: {
				id: cartId,
			},
		});

		myCart.cartItems = [];

		myCart.cartItems = items;

		return this.cartRepository.save(myCart);
	}
}
