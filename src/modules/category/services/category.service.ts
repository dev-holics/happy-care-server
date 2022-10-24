import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repositories';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';
import { ImageService } from 'src/common/media/services/image.service';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly imageService: ImageService,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	async createCategory(createCategoryDto: CategoryCreateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const images = await this.imageService.createImages(
				createCategoryDto.images,
			);
			let categories;
			if (createCategoryDto.parentId) {
				const parent = new CategoryEntity();
				parent.id = createCategoryDto.parentId;
				categories =
					await this.categoryTreeRepository.findDescendantsTreeCategoriesOrder(
						parent,
					);
			} else {
				categories =
					await this.categoryTreeRepository.findTreeCategoriesOrder();
			}
			if (categories) {
				for (const category of categories) {
					category.order = createCategoryDto.order + category.order;
					await this.categoryRepository.updateOne({
						criteria: {
							id: category.id,
						},
						data: {
							order: category.order,
						},
					});
				}
			}

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
}
