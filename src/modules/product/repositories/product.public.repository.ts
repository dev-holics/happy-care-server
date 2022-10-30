import { ProductEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';
import { SORT_OPTION_ENUM } from 'src/modules/product/constants';
import { ProductGetListDto } from 'src/modules/product/dtos';

@Injectable()
export class ProductPublicRepository extends DatabaseRepositoryAbstract<ProductEntity> {
	constructor(
		@InjectRepository(ProductEntity)
		private productPublicRepository: Repository<ProductEntity>,
	) {
		super(productPublicRepository);
	}

	async getProducts(ids: string[], query: ProductGetListDto, skip: number) {
		const { sortOption, limit, page, trademarkId, originId } = query;
		const products = this.productPublicRepository
			.createQueryBuilder('products')
			.distinct(true)
			.innerJoin(
				'products.category',
				'categories',
				'categories.id IN (:...ids)',
			)
			.innerJoinAndSelect('products.category', 'category')
			.leftJoinAndSelect('products.trademark', 'trademark')
			.leftJoinAndSelect('products.origin', 'origin')
			.leftJoinAndSelect('products.images', 'images')
			.leftJoinAndSelect('products.tags', 'tags')
			.orderBy('products.id');
		if (originId) {
			products.where('origin.id = :originId');
		}
		if (trademarkId) {
			products.andWhere('trademark.id = :trademarkId');
		}
		if (sortOption) {
			switch (sortOption) {
				case SORT_OPTION_ENUM.ASC:
					products.orderBy('products.price', 'ASC');
					break;
				case SORT_OPTION_ENUM.DESC:
					products.orderBy('products.price', 'DESC');
					break;
				case SORT_OPTION_ENUM.NEWEST:
					products.orderBy('products.createdAt', 'DESC');
					break;
				case SORT_OPTION_ENUM.SELLWELL:
					products.loadRelationCountAndMap(
						'products.orderCount',
						'products.orderDetails',
					);
					break;
				default:
					break;
			}
		}

		if (limit && page) {
			products.take(+limit).skip(+skip);
		}
		return products
			.setParameters({
				skip,
				ids,
				trademarkId,
				originId,
			})
			.getMany();
	}
}
