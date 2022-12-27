/* eslint-disable prefer-const */
import { CategoryTreeRepository } from 'src/modules/category/repositories';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
	ProductDetailRepository,
	ProductPublicRepository,
} from 'src/modules/product/repositories';
import { ProductGetListDto, ProductParamDto } from 'src/modules/product/dtos';
import { Injectable } from '@nestjs/common';
import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { BranchPublicRepository } from 'src/modules/location/repositories';
import { ProductDetailQueryDto } from 'src/modules/product/dtos/product.detail.query.dto';
import { MoreThanOrEqual } from 'typeorm';
import moment from 'moment';

@Injectable()
export class ProductPublicService {
	constructor(
		private readonly productPublicRepository: ProductPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly paginationService: PaginationService,
		private readonly productDetailRepository: ProductDetailRepository,
		private readonly branchPublicRepository: BranchPublicRepository,
	) {}

	async getProducts(
		productGetListDto: ProductGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.productPublicRepository.count({});
		let products;
		let availableSort;
		console.log(productGetListDto.tag);

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
		return this.paginationService.formatPaginationResult(
			totalData,
			productGetListDto.page,
			productGetListDto.limit,
			null,
			availableSort,
			products,
		);
	}

	async getProductDetail(
		productParamDto: ProductParamDto,
		productDetailQueryDto: ProductDetailQueryDto,
	): Promise<IResponse> {
		if (!productDetailQueryDto.branchId) {
			const [product, productDetail] = await Promise.all([
				this.productPublicRepository.findOne({
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
				}),
				this.productDetailRepository.findOne({
					where: {
						product: {
							id: productParamDto.productId,
						},
						productConsignments: {
							expired: MoreThanOrEqual(
								moment().add(6, 'months').format('"YYYY-MM-DD"'),
							),
						},
					},
					options: {
						relations: {
							productConsignments: true,
						},
					},
				}),
			]);

			let quantity = 0;

			if (productDetail) {
				productDetail.productConsignments.forEach(item => {
					quantity += item.quantity;
				});
			}
			if (product) {
				return { ...product, quantity };
			} else {
				return null;
			}
		} else {
			const [product, productDetail] = await Promise.all([
				this.productPublicRepository.findOne({
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
				}),
				this.productDetailRepository.findOne({
					where: {
						product: {
							id: productParamDto.productId,
						},
						branch: {
							id: productDetailQueryDto.branchId,
						},
						productConsignments: {
							expired: MoreThanOrEqual(
								moment().add(6, 'months').format('"YYYY-MM-DD"'),
							),
						},
					},
					options: {
						relations: {
							productConsignments: true,
						},
					},
				}),
			]);

			let quantity = 0;

			if (productDetail) {
				productDetail.productConsignments.forEach(item => {
					quantity += item.quantity;
				});
			}

			if (product) {
				return { ...product, quantity };
			} else {
				return null;
			}
		}
	}
}
