import { OrderDiscountEntity } from 'src/modules/order/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class OrderDiscountRepository extends DatabaseRepositoryAbstract<OrderDiscountEntity> {
	constructor(
		@InjectRepository(OrderDiscountEntity)
		private orderDiscountRepository: Repository<OrderDiscountEntity>,
	) {
		super(orderDiscountRepository);
	}
}
