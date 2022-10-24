import { ProductDetailEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDetailRepository extends DatabaseRepositoryAbstract<ProductDetailEntity> {
	constructor(
		@InjectRepository(ProductDetailEntity)
		private productDetailRepository: Repository<ProductDetailEntity>,
	) {
		super(productDetailRepository);
	}
}
