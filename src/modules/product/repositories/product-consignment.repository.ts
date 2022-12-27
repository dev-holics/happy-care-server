import { ProductConsignmentEntity } from 'src/modules/product/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { Repository } from 'typeorm';
import moment from 'moment';

@Injectable()
export class ProductConsignmentRepository extends DatabaseRepositoryAbstract<ProductConsignmentEntity> {
	constructor(
		@InjectRepository(ProductConsignmentEntity)
		private productConsignmentRepository: Repository<ProductConsignmentEntity>,
	) {
		super(productConsignmentRepository);
	}

	async totalProductInBranch(productId: string, branchId: string) {
		const expiredPeriod = moment().add(6, 'months').format('"YYYY-MM-DD"');

		return this.productConsignmentRepository
			.createQueryBuilder('productConsignments')
			.leftJoin('productConsignments.productDetail', 'productDetail')
			.leftJoin('productDetail.branch', 'branch')
			.leftJoin('productDetail.product', 'product')
			.where('branch.id = :branchId', { branchId })
			.andWhere('product.id = :productId', { productId })
			.andWhere('productConsignments.expired >= :expiredPeriod', {
				expiredPeriod,
			})
			.select('COUNT(productConsignments.id)', 'numberproductConsignments')
			.addSelect('SUM(productConsignments.quantity)', 'totalProductConsignment')
			.getRawOne();
	}
}
