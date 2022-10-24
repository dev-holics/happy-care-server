import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { ImageService } from 'src/common/media/services/image.service';
import { ProductCreateDto, ProductUpdateDto } from 'src/modules/product/dtos';
import { ProductRepository } from 'src/modules/product/repositories';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/modules/product/entities';

@Injectable()
export class ProductService {
	constructor(
		private readonly imageService: ImageService,
		private readonly productRepository: ProductRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	async createProduct(productCreateDto: ProductCreateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const images = await this.imageService.createImages(
				productCreateDto.images,
			);
			await this.productRepository.createOne({
				data: {
					...productCreateDto,
					trademark: {
						id: productCreateDto.trademarkId,
					},
					category: {
						id: productCreateDto.categoryId,
					},
					origin: {
						id: productCreateDto.originId,
					},
					images: images,
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		}
	}

	async updateProduct(productId: string, productUpdateDto: ProductUpdateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			// eslint-disable-next-line prefer-const
			let images = [];
			// eslint-disable-next-line prefer-const
			let productIds: string[] = [];
			if (productUpdateDto.images) {
				for (const item of productUpdateDto.images) {
					const image = await this.imageService.findImagesByPublicId(
						item.publicId,
					);
					if (!image) {
						const product = new ProductEntity();
						product.id = productId;
						images.push({ ...item, product: product });
					} else {
						productIds.push(item.publicId);
					}
				}
				this.imageService.deleteSoftImages(productIds);
				this.imageService.createImages(images);
			}
			await this.productRepository.updateOne({
				criteria: {
					id: productId,
				},
				data: {
					...productUpdateDto,
					trademark: {
						id: productUpdateDto.trademarkId,
					},
					origin: {
						id: productUpdateDto.originId,
					},
					category: {
						id: productUpdateDto.categoryId,
					},
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		}
	}
}
