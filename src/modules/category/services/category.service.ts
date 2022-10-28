import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repositories';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';
import { ImageService } from 'src/common/media/services/image.service';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryInputParamDto } from 'src/modules/category/dtos';

@Injectable()
export class CategoryService {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly imageService: ImageService,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	async updateOrderOfCategories(parentId: string, order: number) {
		let categories;
		if (parentId) {
			const parent = new CategoryEntity();
			parent.id = parentId;
			categories =
				await this.categoryTreeRepository.findDescendantsTreeCategories(
					parent,
					1,
				);
		} else {
			categories = await this.categoryTreeRepository.findTreeCategories(0);
		}

		if (categories) {
			for (let i = categories.length - 1; i >= 0; i--) {
				if (categories[i].order >= order) {
					categories[i].order = categories[i].order + 1;
					await this.categoryRepository.updateOne({
						criteria: {
							id: categories[i].id,
						},
						data: {
							order: categories[i].order,
						},
					});
				}
			}
		}
		return categories;
	}

	async createCategory(createCategoryDto: CategoryCreateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const images = await this.imageService.createImages(
				createCategoryDto.images,
			);

			await this.updateOrderOfCategories(
				createCategoryDto.parentId,
				createCategoryDto.order,
			);

			await this.categoryRepository.createOne({
				data: {
					...createCategoryDto,
					parent: {
						id: createCategoryDto.parentId,
					},
					images: images,
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw new Error('Internal Server Error');
		}
	}

	async updateCategory(
		categoryId: string,
		categoryUpdateDto: CategoryCreateDto,
	) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const images = [];
			const categoryIds: string[] = [];
			if (categoryUpdateDto.images) {
				for (const item of categoryUpdateDto.images) {
					const image = await this.imageService.findImagesByPublicId(
						item.publicId,
					);
					if (!image) {
						const category = new CategoryEntity();
						category.id = categoryId;
						images.push({ ...item, category: category });
					} else {
						categoryIds.push(item.publicId);
					}
				}
				await this.imageService.deleteSoftImages(categoryIds);
				await this.imageService.createImages(images);
			}

			await this.updateOrderOfCategories(
				categoryUpdateDto.parentId,
				categoryUpdateDto.order,
			);

			await this.categoryRepository.updateOne({
				criteria: {
					id: categoryId,
				},
				data: {
					...categoryUpdateDto,
					parent: {
						id: categoryUpdateDto.parentId,
					},
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		}
	}

	async deleteCategory(categoryInputParamDto: CategoryInputParamDto) {
		return this.categoryRepository.delete({
			id: categoryInputParamDto.categoryId,
		});
	}
}
