import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class CategoryTreeRepository extends DatabaseRepositoryAbstract<CategoryEntity> {
	constructor(
		@InjectRepository(CategoryEntity)
		private categoryTreeRepository: TreeRepository<CategoryEntity>,
	) {
		super(categoryTreeRepository);
	}

	async getcategoryIds(id: string): Promise<string[]> {
		let categories;
		if (id) {
			const category = await this.categoryTreeRepository.findOne({
				where: {
					id,
				},
			});
			categories = await this.categoryTreeRepository.findDescendants(category);
		} else {
			categories = await this.categoryTreeRepository.find();
		}
		const ids = categories.map(category => category.id);
		return ids;
	}
}
