import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { OrderAdminService } from 'src/modules/order/services';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { OrderAdminCreateBodyDto } from 'src/modules/order/dtos';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { GetUser } from 'src/modules/user/decorators/user.decorator';

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
}
