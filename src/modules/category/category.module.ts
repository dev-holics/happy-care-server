import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import {
	CategoryRepository,
	CategoryTreeRepository,
} from 'src/modules/category/repositories';

@Module({
	controllers: [],
	providers: [CategoryService, CategoryRepository, CategoryTreeRepository],
	exports: [CategoryService, CategoryRepository, CategoryTreeRepository],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
