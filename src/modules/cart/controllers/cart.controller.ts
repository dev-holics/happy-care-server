import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { CartEntity } from 'src/modules/cart/entities';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { CartService } from 'src/modules/cart/services';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { PERMISSIONS } from 'src/common/auth/constants/auth.permission.constant';
import { Response } from 'src/common/response/decorators/response.decorator';
import {
	CartCreateDto,
	CartInputParamDto,
	CartItemInputParamDto,
	CartItemUpdateDto,
} from 'src/modules/cart/dtos';

@ApiTags('Cart')
@Controller({
	version: '1',
	path: '/carts',
})
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Response('cart.getMyCart')
	@AuthJwtGuard([PERMISSIONS.READ_USER_CART])
	@UserProfileGuard()
	@AuthApiKeyGuard()
	@Get('')
	async getMyCart(@GetUser('id') id: string): Promise<CartEntity> {
		return this.cartService.getMyCart(id);
	}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_USER_CART])
	@AuthApiKeyGuard()
	@Post('')
	async addCart(@GetUser('id') id: string) {
		return this.cartService.createCart(id);
	}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_USER_CART_ITEM])
	@AuthApiKeyGuard()
	@ApiBody({
		type: [CartCreateDto],
	})
	@Post('/:cartId/items')
	async addCartLineItems(
		@Param() cartInputParamDto: CartInputParamDto,
		@Body() cartItems: CartCreateDto[],
	) {
		return this.cartService.createCartItem(cartInputParamDto, cartItems);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_USER_CART_ITEM])
	@AuthApiKeyGuard()
	@Put('/items/:itemId')
	async updateCart(
		@Param() cartItemInputParamDto: CartItemInputParamDto,
		@Body() cartItemUpdateDto: CartItemUpdateDto,
	) {
		return this.cartService.updateItem(
			cartItemInputParamDto,
			cartItemUpdateDto,
		);
	}

	@Response('deleted soft successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.DELETE_USER_CART_ITEM])
	@AuthApiKeyGuard()
	@Delete('/items/:itemId')
	async deleteSoftItem(@Param() cartItemInputParamDto: CartItemInputParamDto) {
		return this.cartService.deleteSoftItem(cartItemInputParamDto);
	}
}
