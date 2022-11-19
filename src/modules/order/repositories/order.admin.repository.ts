import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { OrderEntity } from 'src/modules/order/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAdminRepository extends DatabaseRepositoryAbstract<OrderEntity> {
	constructor(
		@InjectRepository(OrderEntity)
		private orderAdminRepository: Repository<OrderEntity>,
	) {
		super(orderAdminRepository);
	}
}
