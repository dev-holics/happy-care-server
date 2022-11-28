import { OrderDetailEntity } from 'src/modules/order/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class OrderDetailRepository extends DatabaseRepositoryAbstract<OrderDetailEntity> {
	constructor(
		@InjectRepository(OrderDetailEntity)
		private orderDetailRepository: Repository<OrderDetailEntity>,
	) {
		super(orderDetailRepository);
	}
}
