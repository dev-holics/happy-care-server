import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductPublicService } from 'src/modules/product/services';
import { ProductGetListDto } from 'src/modules/product/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ResponsePagingProduct } from 'src/common/response/decorators/response.decorator';
import { PermissionGetListSerialization } from '../../permission/serializations/permission.get-list.serialization';

@ApiTags('public.product')
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
		return this.productPublicService.getProducts(productGetListDto);
	}
}
