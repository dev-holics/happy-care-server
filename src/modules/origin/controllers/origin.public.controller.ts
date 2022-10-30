import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { OriginPublicService } from 'src/modules/origin/services';
import { OriginGetListDto, OriginParamDto } from 'src/modules/origin/dtos';
import { ResponsePagingBase } from 'src/common/response/decorators/response.decorator';
import {
	IResponseBase,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.Origin')
@Controller({
	version: '1',
	path: '/origins',
})
export class OriginPublicController {
	constructor(private readonly originPublicService: OriginPublicService) {}

	@ResponsePagingBase('origin.getAll')
	@Get()
	getOrigins(
		@Query() originGetListDto: OriginGetListDto,
	): Promise<IResponsePaging> {
		return this.originPublicService.getOrigins(originGetListDto);
	}

	@ResponsePagingBase('trademark.getTrademarkByOriginId')
	@Get('/:originId/trademark')
	async getTrademarksByOriginId(
		@Param() originParamDto: OriginParamDto,
		@Query() originGetListDto: OriginGetListDto,
	): Promise<IResponsePaging> {
		return this.originPublicService.getTrademarksByOriginId(
			originParamDto,
			originGetListDto,
		);
	}
}
