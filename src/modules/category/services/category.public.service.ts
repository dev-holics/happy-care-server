import { Injectable } from '@nestjs/common';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryPublicRepository } from 'src/modules/category/repositories/category.public.repository';

@Injectable()
export class CategoryPublicService {
	constructor(
		private readonly categoryPublicRepository: CategoryPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
	) {}

	async getCategories(query: CategoryInputQueryDto) {
		const parent = await this.categoryPublicRepository.findOne({
			where: {
				id: query.parentId,
			},
		});

		const treeCategories = await this.categoryTreeRepository.get(parent);

		return treeCategories;
	}
}
