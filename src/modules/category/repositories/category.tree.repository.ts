import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class CategoryTreeRepository extends DatabaseRepositoryAbstract<CategoryEntity> {
	constructor(
		@InjectRepository(CategoryEntity)
		private categoryRepository: TreeRepository<CategoryEntity>,
	) {
		super(categoryRepository);
	}

	async findDescendantsTreeCategories(parent: CategoryEntity) {
		const category = await this.categoryRepository.findDescendantsTree(parent, {
			relations: ['images'],
		});
		return category.children;
	}

	async findTreeCategories() {
		return this.categoryRepository.findTrees();
	}
}
