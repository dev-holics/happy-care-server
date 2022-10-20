import { ProductCreateDto } from 'src/modules/product/dtos';
import { ProductRepository } from 'src/modules/product/repositories';
import { AuthService } from 'src/common/auth/services/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
	constructor(
		private readonly authService: AuthService,
		private readonly productRepository: ProductRepository,
	) {}

	async createProduct(productCreateDto: ProductCreateDto) {
		return this.productRepository.createOne({
			data: {
				...productCreateDto,
				trademark: {
					id: productCreateDto.trademarkId,
				},
				category: {
					id: productCreateDto.categoryId,
				},
			},
		});
	}
}
