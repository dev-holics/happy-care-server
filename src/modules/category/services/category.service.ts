import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async createCategory(createCategoryDto: CategoryCreateDto) {
		const category = await this.categoryRepository.createOne({
			data: createCategoryDto,
		});
		return category;
	}
}
