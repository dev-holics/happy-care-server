import { IResponse } from 'src/common/response/interfaces/response.interface';
import { OrderService } from 'src/modules/order/services';
import { Body, Controller, Get, Ip, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderCreateBodyDto } from 'src/modules/order/dtos';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';

@ApiTags('Order')
@Controller({
	version: '1',
	path: '/orders',
})
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Response('order.createPaymentUrl')
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_MY_ORDER])
	@Post('payment-url')
	async createPaymentUrl(
		@Body() orderCreateBodyDto: OrderCreateBodyDto,
		@GetUser('id') userId: string,
		@Ip() ip: string,
	): Promise<IResponse> {
		return this.orderService.createPaymentUrl(userId, ip, orderCreateBodyDto);
	}

	@Response('order.vnPayReturn')
	@Get('callback')
	returnUrl(@Query() query: any): Promise<IResponse> {
		return this.orderService.returnUrl(query);
	}
}
