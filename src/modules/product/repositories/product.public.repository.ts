import { OrderDetailEntity } from 'src/modules/order/entities';
import { ProductInputQueryDto } from 'src/modules/product/dtos/product.input.query.dto';
import { ProductEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';
import { SORT_OPTION_ENUM } from 'src/modules/product/constants';
import { info } from 'console';

@Injectable()
export class ProductPublicRepository extends DatabaseRepositoryAbstract<ProductEntity> {
	constructor(
		@InjectRepository(ProductEntity)
		private productPublicRepository: Repository<ProductEntity>,
	) {
		super(productPublicRepository);
	}

	async getProducts(ids: string[], query: ProductInputQueryDto, skip: number) {
		const { trademark, origin, sortOption, limit, page } = query;
		const products = this.productPublicRepository
			.createQueryBuilder('products')
			.distinct(true)
			.innerJoin(
				'products.category',
				'categories',
				'categories.id IN (:...ids)',
			)
			.innerJoinAndSelect('products.category', 'category')
			.leftJoin('products.trademark', 'trademark')
			.leftJoin('trademark.origin', 'origin')
			.leftJoinAndSelect('products.images', 'images')
			.leftJoinAndSelect('products.tags', 'tags')
			.orderBy('products.id');
		if (trademark) {
			products.andWhere('trademark.name = :trademark');
		}
		if (origin) {
			products.andWhere("origin.type = 'secondary'");
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
					// .addSelect(qb => {
					// 	return qb
					// 		.select('COUNT(orderDetails.id)', 'count')
					// 		.from(OrderDetailEntity, 'orderDetails')
					// 		.where('orderDetails.product.id = products.id');
					// }, 'count')
					// .orderBy('products.count', 'DESC');
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
				trademark,
				origin,
				skip,
				ids,
			})
			.getManyAndCount();
	}
}
