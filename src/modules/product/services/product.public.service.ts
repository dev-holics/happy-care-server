import { CategoryTreeRepository } from 'src/modules/category/repositories';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ProductPublicRepository } from 'src/modules/product/repositories';
import { ProductGetListDto } from 'src/modules/product/dtos';
import { Injectable } from '@nestjs/common';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { isEmpty } from 'radash';
import { PRODUCT_DEFAULT_AVAILABLE_SORT } from '../constants';

@Injectable()
export class ProductPublicService {
	constructor(
		private readonly productPublicRepository: ProductPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getProducts(
		productGetListDto: ProductGetListDto,
	): Promise<IResponsePaging> {
		let whereOptions: Record<string, any> | Record<string, any>[];
		let products;
		let availableSort;
		if (!isEmpty(productGetListDto.search)) {
			whereOptions = productGetListDto.search;
			products = await this.productPublicRepository.findMany({
				where: whereOptions[0],
				options: {
					relations: {
						tags: true,
						images: true,
						category: true,
					},
					page: productGetListDto.page,
					limit: productGetListDto.limit,
					order: {
						createdAt: 'DESC',
					},
				},
			});
			availableSort = ['createdAt'];
		} else {
			const skip = this.paginationService.skip(
				+productGetListDto.page,
				+productGetListDto.limit,
			);
			const ids = await this.categoryTreeRepository.getcategoryIds(
				productGetListDto.categoryId,
			);
			products = await this.productPublicRepository.getProducts(
				ids,
				productGetListDto,
				skip,
			);
			products.sort((a, b) => b.orderCount - a.orderCount);
			availableSort = [productGetListDto.sortOption];
		}
		return this.paginationService.formatPaginationResult(
			productGetListDto.page,
			productGetListDto.limit,
			productGetListDto.availableSearch,
			availableSort,
			products,
		);
	}
}
