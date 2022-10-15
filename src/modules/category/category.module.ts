import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';

@Module({
	controllers: [],
	providers: [
		CategoryService,
		CategoryRepository,
	],
	exports: [
		CategoryService,
		CategoryRepository,
	],
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
