import {
	ProductCreateDto,
	ProductParamDto,
	ProductUpdateDto,
} from 'src/modules/product/dtos';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { Body, Controller, HttpStatus, Post, Put, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ProductService } from 'src/modules/product/services';
import { PERMISSIONS } from 'src/common/auth/constants';
import { Response } from 'src/common/response/decorators/response.decorator';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';

@ApiTags('Admin.Product')
@Controller({
	version: '1',
	path: '/products',
})
export class ProductAdminController {
	constructor(private readonly productService: ProductService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_PRODUCT])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductCreateDto)
	@Post('')
	async createProduct(@Body() productCreateDto: ProductCreateDto) {
		return this.productService.createProduct(productCreateDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_PRODUCT])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductUpdateDto)
	@ApiParam({
		name: 'productId',
		type: 'string',
	})
	@Put('/:productId')
	async updateProduct(
		@Param() productParamDto: ProductParamDto,
		@Body() productUpdateDto: ProductUpdateDto,
	) {
		return this.productService.updateProduct(
			productParamDto.productId,
			productUpdateDto,
		);
	}
}
