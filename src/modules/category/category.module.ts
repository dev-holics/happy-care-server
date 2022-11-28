import { CategoryService } from 'src/modules/category/services/category.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities';
import {
	CategoryTreeRepository,
	CategoryRepository,
	CategoryPublicRepository,
} from 'src/modules/category/repositories';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryEntity]),
		forwardRef(() => ProductModule),
	],
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
})
export class CategoryModule {}
