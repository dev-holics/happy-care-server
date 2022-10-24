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
		return this.categoryRepository.findDescendantsTree(parent);
	}

	async findTreeCategories() {
		return this.categoryRepository.findTrees();
	}

	async findTreeCategoriesOrder() {
		const categories = await this.categoryRepository.findTrees();
		categories.sort((a, b) => b.order - a.order);
		return categories;
	}

	async findDescendantsTreeCategoriesOrder(parent: CategoryEntity) {
		const categories = await this.categoryRepository.findDescendantsTree(
			parent,
			{ depth: 1 },
		);
		categories.children.sort((a, b) => b.order - a.order);
		return categories.children;
	}
}
