import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import {
	CategoryTreeRepository,
	CategoryRepository,
	CategoryPublicRepository,
} from 'src/modules/category/repositories';

@Module({
	controllers: [],
	providers: [
		CategoryPublicService,
		CategoryPublicRepository,
		CategoryRepository,
		CategoryTreeRepository,
	],
	exports: [
		CategoryPublicService,
		CategoryPublicRepository,
		CategoryRepository,
		CategoryTreeRepository,
	],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
