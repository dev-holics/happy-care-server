import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { TrademarkAdminService } from 'src/modules/origin/services';
import { Response } from 'src/common/response/decorators/response.decorator';
import { Body, Controller, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from 'src/common/auth/constants';
import {
	TrademarkCreateBodyDto,
	TrademarkParamDto,
	TrademarkUpdateBodyDto,
} from 'src/modules/origin/dtos';

@ApiTags('Admin.Trademark')
@Controller({
	version: '1',
	path: '/trademarks',
})
export class TrademarkAdminController {
	constructor(private readonly trademarkAdminService: TrademarkAdminService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_ORIGIN])
	@AuthApiKeyGuard()
	@Post()
	async createTrademark(
		@Body() trademarkCreateBodyDto: TrademarkCreateBodyDto,
	) {
		return this.trademarkAdminService.createTrademark(trademarkCreateBodyDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_ORIGIN])
	@AuthApiKeyGuard()
	@Put('/:trademarkId')
	async updateTrademark(
		@Param() trademarkParamDto: TrademarkParamDto,
		@Body() trademarkUpdateBodyDto: TrademarkUpdateBodyDto,
	) {
		return;
	}
}
