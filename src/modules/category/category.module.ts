import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryPublicRepository } from 'src/modules/category/repositories/category.public.repository';

@Module({
	controllers: [],
	providers: [
		CategoryService,
		CategoryPublicService,
		CategoryRepository,
		CategoryPublicRepository,
		CategoryTreeRepository,
	],
	exports: [
		CategoryService,
		CategoryPublicService,
		CategoryRepository,
		CategoryPublicRepository,
		CategoryTreeRepository,
	],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
