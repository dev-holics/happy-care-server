import { options } from 'joi';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
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
		if (query.parentId) {
			const parent = await this.categoryPublicRepository.findOne({
				where: {
					id: query.parentId,
				},
				options: {
					relations: {
						parent: true,
					},
				},
			});
			return this.categoryTreeRepository.findDescendantsTreeCategories(parent);
		}

		return this.categoryTreeRepository.findTreeCategories();
	}

	async getAllCategories() {
		return this.categoryPublicRepository.findMany({});
	}
}
