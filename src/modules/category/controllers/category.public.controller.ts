import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryPublicService } from 'src/modules/category/services/category.public.service';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';

@ApiTags('Public.category')
@Controller({
	version: '1',
	path: '/categories',
})
export class CategoryPublicController {
	constructor(private readonly categoryPublicService: CategoryPublicService) {}

	@Get('/tree')
	async getCategories(@Query() body: CategoryInputQueryDto) {
		return this.categoryPublicService.getCategories(body);
	}

	@Get('')
	async getAllCategories() {
		return this.categoryPublicService.getAllCategories();
	}
}
