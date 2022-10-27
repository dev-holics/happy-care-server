import { CartItemEntity } from 'src/modules/cart/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class CartItemRepository extends DatabaseRepositoryAbstract<CartItemEntity> {
	constructor(
		@InjectRepository(CartItemEntity)
		private cartItemRepository: Repository<CartItemEntity>,
	) {
		super(cartItemRepository);
	}
}
