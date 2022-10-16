import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { CategoryService } from 'src/modules/category/services/category.service';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';

@ApiTags('categories')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@AuthJwtGuard([PERMISSIONS.USER_CREATE_CATEGORY])
	@AuthApiKeyGuard()
	@Post('')
	async createCategory(@Body() body: CategoryCreateDto) {
		return this.categoryService.createCategory(body);
	}
}
