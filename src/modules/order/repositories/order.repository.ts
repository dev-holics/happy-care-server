import { OrderEntity } from 'src/modules/order/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class OrderRepository extends DatabaseRepositoryAbstract<OrderEntity> {
	constructor(
		@InjectRepository(OrderEntity)
		private orderRepository: Repository<OrderEntity>,
	) {
		super(orderRepository);
	}
}
