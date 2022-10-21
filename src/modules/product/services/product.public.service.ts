import { SORT_OPTION_ENUM } from './../constants/price.enum.constant';
import { CategoryTreeRepository } from 'src/modules/category/repositories';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ProductPublicRepository } from 'src/modules/product/repositories';
import { ProductInputQueryDto } from 'src/modules/product/dtos/product.input.query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductPublicService {
	constructor(
		private readonly productPublicRepository: ProductPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getProducts(productInputQueryDto: ProductInputQueryDto) {
		const skip = this.paginationService.skip(
			+productInputQueryDto.page,
			+productInputQueryDto.limit,
		);
		const ids = await this.categoryTreeRepository.getcategoryIds(
			productInputQueryDto.category,
		);
		const [products, count]: any =
			await this.productPublicRepository.getProducts(
				ids,
				productInputQueryDto,
				skip,
			);
		if (productInputQueryDto.sortOption === SORT_OPTION_ENUM.SELLWELL) {
			products.sort((a, b) => b.orderCount - a.orderCount);
		}
		return products;
	}
}
