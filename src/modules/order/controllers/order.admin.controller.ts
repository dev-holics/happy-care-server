import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { OrderAdminService } from 'src/modules/order/services';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import {
	OrderAdminCreateBodyDto,
	OrderListQueryDto,
	OrderTotalQueryDto,
} from 'src/modules/order/dtos';
import {
	Response,
	ResponseBase,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import {
	IResponse,
	IResponseBase,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { UpdateOrderStatusDto } from 'src/modules/order/dtos/update-order-status.dto';
import { number } from 'joi';

@ApiTags('Admin.Order')
@Controller({
	version: '1',
	path: '/orders',
})
export class OrderAdminController {
	constructor(private readonly orderAdminService: OrderAdminService) {}

	@ResponsePagingBase('order.getList')
	@AuthJwtGuard([PERMISSIONS.READ_ALL_ORDERS])
	@AuthApiKeyGuard()
	@Get()
	async getOrders(
		@Query() orderListQueryDto: OrderListQueryDto,
	): Promise<IResponsePaging> {
		return this.orderAdminService.getOrders(orderListQueryDto);
	}

	@Response('order.getTotal')
	@AuthJwtGuard([PERMISSIONS.READ_TOTAL_ORDERS])
	@AuthApiKeyGuard()
	@Get('total')
	async getTotalOrders(
		@Query() orderTotalQueryDto: OrderTotalQueryDto,
	): Promise<IResponse> {
		return this.orderAdminService.getTotalOrders(orderTotalQueryDto);
	}

	@ApiQuery({
		name: 'year',
		required: false,
		type: 'number',
	})
	@ResponseBase('totalRevenue.Year')
	@AuthJwtGuard([PERMISSIONS.READ_REVENUE_YEAR])
	@AuthApiKeyGuard()
	@Get('revenue-year')
	getTotalPriceInYear(@Query('year') year): Promise<IResponseBase> {
		return this.orderAdminService.getTotalPriceInYear(year);
	}

	@ApiQuery({
		name: 'date',
		required: false,
		type: 'string',
		example: '2022-12-29',
	})
	@Response('totalRevenue.Date')
	@AuthJwtGuard([PERMISSIONS.READ_REVENUE_YEAR])
	@AuthApiKeyGuard()
	@Get('revenue-date')
	getTotalPriceInDay(@Query('date') date): Promise<IResponse> {
		return this.orderAdminService.getTotalPriceInDay(date);
	}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_ORDER])
	@AuthApiKeyGuard()
	@Post()
	async createOrder(
		@GetUser() user: any,
		@Body() orderCreateBodyDto: OrderAdminCreateBodyDto,
	) {
		return this.orderAdminService.createOrder(user, orderCreateBodyDto);
	}

	@Response('order.updatedStatus')
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.UPDATE_ORDER_STATUS])
	@AuthApiKeyGuard()
	@ApiParam({
		name: 'orderId',
		type: 'string',
	})
	@Put('/:orderId/status')
	async updateOrderStatus(
		@Param('orderId') orderId: string,
		@Body() updateStatusDto: UpdateOrderStatusDto,
		@GetUser('id') userId: string,
	): Promise<IResponse> {
		const { status } = updateStatusDto;
		return this.orderAdminService.updateOrderStatus(orderId, status, userId);
	}
}
