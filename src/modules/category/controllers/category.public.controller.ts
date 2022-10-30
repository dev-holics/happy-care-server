import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';

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

	@ResponseBase('category.getAll')
	@Get('')
	async getAllCategories(): Promise<IResponseBase> {
		return this.categoryPublicService.getAllCategories();
	}
}
