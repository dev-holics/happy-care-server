import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/services/category.service';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { CategoryCreateDto } from 'src/modules/category/dtos/category.create.dto';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';
import { Response } from 'src/common/response/decorators/response.decorator';

@ApiTags('Categories')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_CATEGORY])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(CategoryCreateDto)
	@Post('')
	async createCategory(@Body() body: CategoryCreateDto) {
		return this.categoryService.createCategory(body);
	}
}
