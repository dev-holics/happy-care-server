import { ProductConsignmentEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
export class ProductConsignmentRepository extends DatabaseRepositoryAbstract<ProductConsignmentEntity> {
	constructor(
		@InjectRepository(ProductConsignmentEntity)
		private productConsignmentRepository: Repository<ProductConsignmentEntity>,
	) {
		super(productConsignmentRepository);
	}
}
