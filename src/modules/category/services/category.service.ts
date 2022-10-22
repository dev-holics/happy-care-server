import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repositories';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async createCategory(createCategoryDto: CategoryCreateDto) {
		const categories = await this.categoryRepository.findAll({
			where: {
				parent: {
					id: createCategoryDto.parent,
				},
				order: MoreThanOrEqual(createCategoryDto.order),
			},
			options: {
				order: {
					order: 'DESC',
				},
			},
		});

		if (categories) {
			for (const category of categories) {
				category.order++;
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

		return this.categoryRepository.createOne({
			data: createCategoryDto,
		});
	}
}
