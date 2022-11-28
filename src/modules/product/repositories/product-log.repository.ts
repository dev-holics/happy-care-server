import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { ProductLogEntity } from 'src/modules/product/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductLogRepository extends DatabaseRepositoryAbstract<ProductLogEntity> {
	constructor(
		@InjectRepository(ProductLogEntity)
		private productLogRepository: Repository<ProductLogEntity>,
	) {
		super(productLogRepository);
	}
}
