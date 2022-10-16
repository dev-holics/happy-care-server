import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Post,
} from '@nestjs/common';

import { CategoryService } from 'src/modules/category/services/category.service';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';

@ApiTags('categories')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('')
	async createCategory(@Body() body: CategoryCreateDto) {
		return this.categoryService.createCategory(body);
	}
}
