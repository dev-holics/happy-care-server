import { ProductEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends DatabaseRepositoryAbstract<ProductEntity> {
	constructor(
		@InjectRepository(ProductEntity)
		private productRepository: Repository<ProductEntity>,
	) {
		super(productRepository);
	}
}
