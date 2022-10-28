import {
	CategoryCreateDto,
	CategoryInputParamDto,
	CategoryUpdateDto,
} from 'src/modules/category/dtos';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import {
	Body,
	Controller,
	HttpStatus,
	Post,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { CategoryService } from 'src/modules/category/services/category.service';
import { PERMISSIONS } from 'src/common/auth/constants';
import { Response } from 'src/common/response/decorators/response.decorator';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';
import { faker } from '@faker-js/faker';

@ApiTags('Admin.Categories')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryAdminController {
	constructor(private readonly categoryService: CategoryService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_CATEGORY])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(CategoryCreateDto)
	@Post('')
	async createCategory(@Body() body: CategoryCreateDto) {
		return this.categoryService.createCategory(body);
	}

	@Response('updated', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_CATEGORY])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(CategoryUpdateDto)
	@ApiParam({
		name: 'categoryId',
		description: 'Category id',
		example: faker.datatype.uuid(),
		type: String,
	})
	@Put(':categoryId')
	async updateCategory(
		@Param() categoryParamDto: CategoryInputParamDto,
		@Body() categoryUpdateDto: CategoryUpdateDto,
	) {
		return this.categoryService.updateCategory(
			categoryParamDto.categoryId,
			categoryUpdateDto,
		);
	}

	@Response('deleted soft successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.DELETE_CATEGORY])
	@AuthApiKeyGuard()
	@Delete('/:categoryId')
	async deleteSoftCategory(
		@Param() categoryInputParamDto: CategoryInputParamDto,
	) {
		return this.categoryService.deleteCategory(categoryInputParamDto);
	}
}
