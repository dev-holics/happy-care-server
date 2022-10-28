import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { OriginPublicService } from 'src/modules/origin/services';
import { OriginParamDto } from 'src/modules/origin/dtos';

@ApiTags('Public.Origin')
@Controller({
	version: '1',
	path: '/origins',
})
export class OriginPublicController {
	constructor(private readonly originPublicService: OriginPublicService) {}

	@Get()
	getOrigins(): Promise<OriginEntity[]> {
		return this.originPublicService.getOrigins();
	}

	@Get('/:originId/trademark')
	async getTrademarksByOriginId(
		@Param() originParamDto: OriginParamDto,
	): Promise<TrademarkEntity[]> {
		return this.originPublicService.getTrademarksByOriginId(originParamDto);
	}
}
