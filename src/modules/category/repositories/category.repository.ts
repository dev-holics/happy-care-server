import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, InsertEvent, Repository } from 'typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import slugify from 'slugify';

@Injectable()
export class CategoryRepository extends DatabaseRepositoryAbstract<CategoryEntity> {
	constructor(
		@InjectConnection() readonly connection: Connection,
		@InjectRepository(CategoryEntity)
		private categoryRepository: Repository<CategoryEntity>,
	) {
		super(categoryRepository);
		connection.subscribers.push(this);
	}

	listenTo() {
		return CategoryEntity;
	}

	beforeInsert(event: InsertEvent<CategoryEntity>) {
		event.entity.slug = slugify(event.entity.name.toLocaleLowerCase());
	}
}
