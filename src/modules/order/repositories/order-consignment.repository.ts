import { OrderConsignmentEntity } from 'src/modules/order/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class OrderConsignmentRepository extends DatabaseRepositoryAbstract<OrderConsignmentEntity> {
	constructor(
		@InjectRepository(OrderConsignmentEntity)
		private orderConsignmentRepository: Repository<OrderConsignmentEntity>,
	) {
		super(orderConsignmentRepository);
	}
}
