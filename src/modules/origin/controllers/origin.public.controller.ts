import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { OriginPublicService } from 'src/modules/origin/services';
import { OriginParamDto } from 'src/modules/origin/dtos';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.Origin')
@Controller({
	version: '1',
	path: '/origins',
})
export class OriginPublicController {
	constructor(private readonly originPublicService: OriginPublicService) {}

	@ResponseBase('origin.getAll')
	@Get()
	getOrigins(): Promise<IResponseBase> {
		return this.originPublicService.getOrigins();
	}

	@ResponseBase('trademark.getTrademarkByOriginId')
	@Get('/:originId/trademark')
	async getTrademarksByOriginId(
		@Param() originParamDto: OriginParamDto,
	): Promise<IResponseBase> {
		return this.originPublicService.getTrademarksByOriginId(originParamDto);
	}
}
