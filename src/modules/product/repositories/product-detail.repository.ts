import {
	ProductDetailEntity,
	ProductEntity,
} from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';
import { ProductLogImportDto } from 'src/modules/product/dtos';
import { BranchEntity } from 'src/modules/location/entities';

@Injectable()
export class ProductDetailRepository extends DatabaseRepositoryAbstract<ProductDetailEntity> {
	constructor(
		@InjectRepository(ProductDetailEntity)
		private productDetailRepository: Repository<ProductDetailEntity>,
	) {
		super(productDetailRepository);
	}
}
