import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { OrderService } from 'src/modules/order/services';
import {
	Body,
	Controller,
	Get,
	Ip,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
	OrderCreateBodyDto,
	OrderHistoryQueryDto,
} from 'src/modules/order/dtos';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import {
	Response,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { OrderParamDto } from 'src/modules/order/dtos/order.param.dto';
import { UpdateOrderStatusDto } from 'src/modules/order/dtos/update-order-status.dto';

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

	@ResponsePagingBase('order.history')
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.READ_ORDER_HISTORY])
	@Get('/history')
	async getOrderHistory(
		@GetUser('id') userId: string,
		@Query() orderHistoryQueryDto: OrderHistoryQueryDto,
	): Promise<IResponsePaging> {
		return this.orderService.getOrderHistory(userId, orderHistoryQueryDto);
	}

	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.READ_ORDER])
	@AuthApiKeyGuard()
	@ApiParam({
		name: 'orderId',
		type: 'string',
	})
	@Get('/:orderId')
	async getOrderById(
		@GetUser('id') id: string,
		@Param() orderParamDto: OrderParamDto,
	) {
		return this.orderService.getOrderById(id, orderParamDto);
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
		console.log('status', status);
		return this.orderService.updateOrderStatus(orderId, status, userId);
	}
}
