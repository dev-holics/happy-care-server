import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { CartService } from 'src/modules/cart/services';
import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Put,
	Query,
} from '@nestjs/common';
import { PERMISSIONS } from 'src/common/auth/constants/auth.permission.constant';
import {
	CartGetListDto,
	CartInputParamDto,
	CartInputUpdateDto,
} from 'src/modules/cart/dtos';
import {
	Response,
	ResponsePagingCart,
} from 'src/common/response/decorators/response.decorator';

@ApiTags('Admin.Cart')
@Controller({
	version: '1',
	path: '/carts',
})
export class CartAdminController {
	constructor(private readonly cartService: CartService) {}

	@ResponsePagingCart('cart.getList')
	@AuthJwtGuard([PERMISSIONS.READ_USER_CART])
	@AuthApiKeyGuard()
	@Get('')
	async getCarts(
		@Query() cartGetListDto: CartGetListDto,
	): Promise<IResponsePaging> {
		return this.cartService.getCarts(cartGetListDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_USER_CART])
	@AuthApiKeyGuard()
	@Put('/:cartId')
	async updateCart(
		@Param() cartInputParamDto: CartInputParamDto,
		@Body() cartInputUpdateDto: CartInputUpdateDto,
	) {
		return this.cartService.updateCustomerId(
			cartInputParamDto,
			cartInputUpdateDto,
		);
	}

	@Response('deleted soft successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.DELETE_USER_CART])
	@AuthApiKeyGuard()
	@Delete('/:cartId')
	async deleteCart(@Param() cartInputParamDto: CartInputParamDto) {
		return this.cartService.deleteCart(cartInputParamDto);
	}
}
