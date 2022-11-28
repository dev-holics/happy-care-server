import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';
import {
	ResponseBase,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import {
	IResponseBase,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { CategoryGetListDto } from 'src/modules/category/dtos';

@ApiTags('Public.category')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryPublicController {
	constructor(private readonly categoryPublicService: CategoryPublicService) {}

	@ResponseBase('category.getListTree')
	@Get('/tree')
	async getCategories(
		@Query() body: CategoryInputQueryDto,
	): Promise<IResponseBase> {
		return this.categoryPublicService.getCategories(body);
	}

	@ResponsePagingBase('category.getAll')
	@Get('')
	async getAllCategories(
		@Query() categoryGetListDto: CategoryGetListDto,
	): Promise<IResponsePaging> {
		return this.categoryPublicService.getAllCategories(categoryGetListDto);
	}

	@ResponseBase('category.getCountProduct')
	@Get('/parent')
	async getCountProductCategoryParent(): Promise<IResponseBase> {
		return this.categoryPublicService.getCountProductCategoryParent();
	}
}
