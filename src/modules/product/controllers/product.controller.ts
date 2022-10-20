import { ProductCreateDto } from 'src/modules/product/dtos/product.create.dto';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { ProductService } from 'src/modules/product/services';
import { PERMISSIONS } from 'src/common/auth/constants';
import { Response } from 'src/common/response/decorators/response.decorator';

@ApiTags('product')
@Controller({
	version: '1',
	path: '/products',
})
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.USER_CREATE_PRODUCT])
	@AuthApiKeyGuard()
	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@Post('')
	async createProduct(@Body() productCreateDto: ProductCreateDto) {
		return this.productService.createProduct(productCreateDto);
	}
}
