import { CategoryService } from 'src/modules/category/services/category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
	CategoryTreeRepository,
	CategoryRepository,
	CategoryPublicRepository,
} from 'src/modules/category/repositories';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';

@Module({
	controllers: [],
	providers: [
		CategoryPublicService,
		CategoryPublicRepository,
		CategoryRepository,
		CategoryTreeRepository,
		CategoryService,
	],
	exports: [
		CategoryPublicService,
		CategoryPublicRepository,
		CategoryRepository,
		CategoryTreeRepository,
		CategoryService,
	],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
