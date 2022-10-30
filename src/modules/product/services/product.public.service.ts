import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { CategoryTreeRepository } from 'src/modules/category/repositories';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
	ProductDetailRepository,
	ProductPublicRepository,
} from 'src/modules/product/repositories';
import { ProductGetListDto, ProductParamDto } from 'src/modules/product/dtos';
import { Injectable } from '@nestjs/common';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { isEmpty } from 'radash';
import { MoreThan, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ProductPublicService {
	constructor(
		private readonly productPublicRepository: ProductPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly paginationService: PaginationService,
		private readonly productDetailRepository: ProductDetailRepository,
		private readonly helperDateService: HelperDateService,
	) {}

	async getProducts(
		productGetListDto: ProductGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.productPublicRepository.count({});
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
			const ids = await this.categoryTreeRepository.getCategoryIds(
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
			totalData,
			productGetListDto.page,
			productGetListDto.limit,
			productGetListDto.availableSearch,
			availableSort,
			products,
		);
	}

	async getProductDetails(productParamDto: ProductParamDto) {
		const product = await this.productPublicRepository.findOne({
			where: {
				id: productParamDto.productId,
			},
			options: {
				relations: {
					images: true,
					category: true,
					trademark: true,
					origin: true,
				},
			},
		});
		const productDetails = await this.productDetailRepository.findMany({
			where: {
				expiredDate: MoreThanOrEqual(this.helperDateService.now()),
				quantity: MoreThan(0),
				product: {
					id: productParamDto.productId,
				},
			},
		});
		product.productDetails = productDetails;
		return product;
	}
}
