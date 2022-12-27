import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductPublicService } from 'src/modules/product/services';
import { ProductGetListDto, ProductParamDto } from 'src/modules/product/dtos';
import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import {
	Response,
	ResponsePagingProduct,
} from 'src/common/response/decorators/response.decorator';
import { ProductDetailQueryDto } from 'src/modules/product/dtos/product.detail.query.dto';

@ApiTags('Public.product')
@Controller({
	version: '1',
	path: '/products',
})
export class ProductPublicController {
	constructor(private readonly productPublicService: ProductPublicService) {}

	@ResponsePagingProduct('product.getList')
	@Get('/list')
	async getProducts(
		@Query() productGetListDto: ProductGetListDto,
	): Promise<IResponsePaging> {
		console.log(productGetListDto);
		return this.productPublicService.getProducts(productGetListDto);
	}

	@Response('product.getDetail')
	@Get('/:productId')
	async getProductDetail(
		@Param() productParamDto: ProductParamDto,
		@Query() productDetailQueryDto: ProductDetailQueryDto,
	): Promise<IResponse> {
		return this.productPublicService.getProductDetail(
			productParamDto,
			productDetailQueryDto,
		);
	}
}
