import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { OrderAdminService } from 'src/modules/order/services';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import {
	OrderAdminCreateBodyDto,
	OrderListQueryDto,
} from 'src/modules/order/dtos';
import {
	Response,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@ApiTags('Admin.Order')
@Controller({
	version: '1',
	path: '/orders',
})
export class OrderAdminController {
	constructor(private readonly orderAdminService: OrderAdminService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_ORDER])
	@AuthApiKeyGuard()
	@Post()
	async createOrder(
		@GetUser('id') userId: string,
		@Body() orderCreateBodyDto: OrderAdminCreateBodyDto,
	) {
		return this.orderAdminService.createOrder(userId, orderCreateBodyDto);
	}

	@ResponsePagingBase('order.getList')
	@AuthJwtGuard([PERMISSIONS.READ_ALL_ORDERS])
	@AuthApiKeyGuard()
	@Get()
	async getOrders(
		@Query() orderListQueryDto: OrderListQueryDto,
	): Promise<IResponsePaging> {
		return this.orderAdminService.getOrders(orderListQueryDto);
	}
}
