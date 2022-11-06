import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ProductDetailPublicService } from 'src/modules/product/services';
import { ResponsePagingProduct } from 'src/common/response/decorators/response.decorator';
import { ProductDetailInputQueryDto } from 'src/modules/product/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.ProductDetail')
@Controller({
	version: '1',
	path: '/product-details',
})
export class ProductDetailPublicController {
	constructor(
		private readonly productDetailPublicService: ProductDetailPublicService,
	) {}

	@ResponsePagingProduct('productDetail.getList')
	@Get('/product-details')
	async getProductDetailList(
		@Query() productDetailInputQueryDto: ProductDetailInputQueryDto,
	): Promise<IResponsePaging> {
		return this.productDetailPublicService.getProductDetailList(
			productDetailInputQueryDto,
		);
	}
}
