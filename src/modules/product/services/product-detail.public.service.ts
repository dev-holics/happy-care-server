import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ProductDetailRepository } from 'src/modules/product/repositories';
import { Injectable } from '@nestjs/common';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ProductDetailInputQueryDto } from 'src/modules/product/dtos/product-detail.input.query.dto';

@Injectable()
export class ProductDetailPublicService {
	constructor(
		private readonly paginationService: PaginationService,
		private readonly productDetailRepository: ProductDetailRepository,
	) {}

	async getProductDetailList(
		productDetailInputQueryDto: ProductDetailInputQueryDto,
	): Promise<IResponsePaging> {
		const totalData = await this.productDetailRepository.count({
			where: {
				branch: {
					id: productDetailInputQueryDto.branchId || undefined,
				},
				product: productDetailInputQueryDto.search[0],
			},
		});

		const result = await this.productDetailRepository.findMany({
			where: {
				branch: {
					id: productDetailInputQueryDto.branchId || undefined,
				},
				product: productDetailInputQueryDto.search[0],
			},
			options: {
				page: productDetailInputQueryDto.page,
				limit: productDetailInputQueryDto.limit,
				relations: {
					branch: true,
					product: true,
				},
				order: {
					updatedAt: 'DESC',
				},
			},
		});

		return this.paginationService.formatPaginationResult(
			totalData,
			productDetailInputQueryDto.page,
			productDetailInputQueryDto.limit,
			productDetailInputQueryDto.availableSearch,
			[],
			result,
		);
	}
}
