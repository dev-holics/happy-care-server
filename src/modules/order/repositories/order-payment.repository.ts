import { OrderPaymentEntity } from 'src/modules/order/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class OrderPaymentRepository extends DatabaseRepositoryAbstract<OrderPaymentEntity> {
	constructor(
		@InjectRepository(OrderPaymentEntity)
		private orderPaymentRepository: Repository<OrderPaymentEntity>,
	) {
		super(orderPaymentRepository);
	}
}
