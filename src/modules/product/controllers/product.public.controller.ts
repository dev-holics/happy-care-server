import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductPublicService } from 'src/modules/product/services';
import { ProductInputQueryDto } from 'src/modules/product/dtos';

@ApiTags('public.product')
@Controller({
	version: '1',
	path: '/products',
})
export class ProductPublicController {
	constructor(private readonly productPublicService: ProductPublicService) {}

	@Get('')
	async getProducts(@Query() productInputQueryDto: ProductInputQueryDto) {
		return this.productPublicService.getProducts(productInputQueryDto);
	}
}
