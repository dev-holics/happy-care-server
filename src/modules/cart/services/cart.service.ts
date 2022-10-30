import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { CartGetListDto } from 'src/modules/cart/dtos';
import { ProductEntity } from 'src/modules/product/entities';
import { CartEntity } from 'src/modules/cart/entities';
import { RedisService } from 'src/common/redis/services/redis.service';
import {
	CartRepository,
	CartItemRepository,
} from 'src/modules/cart/repositories';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {
	CartInputUpdateDto,
	CartInputParamDto,
	CartCreateDto,
	CartItemInputParamDto,
	CartItemUpdateDto,
} from 'src/modules/cart/dtos';

@Injectable()
export class CartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly cartItemRepository: CartItemRepository,
		private readonly paginationService: PaginationService,
		private readonly redisService: RedisService,
	) {}

	async getMyCart(userId: string): Promise<CartEntity> {
		let cart;
		const carts = await this.redisService.appCart().get();
		if (carts) {
			cart = carts.find(p => p.user.id === userId);
		} else {
			cart = await this.cartRepository.findOne({
				where: {
					user: {
						id: userId,
					},
				},
				options: {
					relations: {
						cartItems: true,
					},
				},
			});
			const allCarts = await this.cartRepository.findAll({
				options: {
					relations: {
						cartItems: true,
						user: true,
					},
				},
			});
			await this.redisService.appCart().set(allCarts);
		}
		if (!cart) {
			throw new NotFoundException({
				statusCode: 400,
				message: 'cart.error.notFound',
			});
		}
		delete cart.user;
		return cart;
	}

	async getCarts(cartGetListDto: CartGetListDto): Promise<IResponsePaging> {
		const carts = await this.cartRepository.findMany({
			options: {
				relations: {
					user: true,
					cartItems: true,
				},
				page: cartGetListDto.page,
				limit: cartGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			cartGetListDto.page,
			cartGetListDto.limit,
			null,
			null,
			carts,
		);
	}

	// async createCart(userId: string) {
	// 	return Promise.all([
	// 		this.cartRepository.createOne({
	// 			data: {
	// 				user: {
	// 					id: userId,
	// 				},
	// 			},
	// 		}),
	// 		this.redisService.appCart().delete(),
	// 	]);
	// }

	async createCartItem(userId: string, cartItems: CartCreateDto[]) {
		// eslint-disable-next-line prefer-const
		let newCart;
		let cartId;
		const cart = await this.cartRepository.findOne({
			where: {
				user: {
					id: userId,
				},
			},
		});
		if (!cart) {
			newCart = await this.cartRepository.createOne({
				data: {
					user: {
						id: userId,
					},
				},
			});
			cartId = newCart.id;
		} else {
			cartId = cart.id;
		}
		const cartUser = new CartEntity();
		cart.id = cartId;
		// eslint-disable-next-line prefer-const
		cartItems = await Promise.all(
			cartItems.map(async (item: any, index: number) => {
				const product = new ProductEntity();
				product.id = item.productId;
				const cartItem = await this.cartItemRepository.findOne({
					where: {
						cart: cartUser,
						product,
					},
				});
				if (cartItem) {
					const updateItem = await this.cartItemRepository.updateOne({
						criteria: {
							id: cartItem.id,
						},
						data: {
							quantity: item.quantity + cartItem.quantity,
							cart: cartUser,
							product,
						},
					});
					return;
				}
				item.cart = cart;
				item.product = product;
				return item;
			}),
		);
		cartItems = cartItems.filter(item => item !== undefined);
		if (cartItems) {
			await this.cartItemRepository.createMany({
				data: Object.values(cartItems),
			});
			await this.redisService.appCart().delete();
			return;
		} else {
			await this.redisService.appCart().delete();
			return;
		}
	}

	async updateCustomerId(
		cartInputParamDto: CartInputParamDto,
		cartInputUpdateDto: CartInputUpdateDto,
	) {
		const updateCart = await this.cartRepository.updateOne({
			criteria: {
				id: cartInputParamDto.cartId,
			},
			data: {
				user: {
					id: cartInputUpdateDto.customerId,
				},
			},
		});

		if (!updateCart) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'cart.error.cannotUpdate',
			});
		}

		await this.redisService.appCart().delete();

		return updateCart;
	}

	async updateItem(
		cartItemInputParamDto: CartItemInputParamDto,
		cartItemUpdateDto: CartItemUpdateDto,
	) {
		const cartItemUpdate = await this.cartItemRepository.updateOne({
			criteria: {
				id: cartItemInputParamDto.itemId,
			},
			data: cartItemUpdateDto,
		});

		if (!cartItemUpdate) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'cart_item.error.cannotUpdate',
			});
		}

		await this.redisService.appCart().delete();

		return cartItemUpdate;
	}

	async deleteCart(cartInputParamDto: CartInputParamDto) {
		return Promise.all([
			this.cartRepository.hardDelete({ id: cartInputParamDto.cartId }),
			this.redisService.appCart().delete(),
		]);
	}

	async deleteSoftItem(cartItemInputParamDto: CartItemInputParamDto) {
		return Promise.all([
			this.cartItemRepository.delete({ id: cartItemInputParamDto.itemId }),
			this.redisService.appCart().delete(),
		]);
	}
}
