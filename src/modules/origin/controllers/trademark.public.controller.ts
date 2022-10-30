import { TrademarkGetListDto } from 'src/modules/origin/dtos';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { TrademarkPublicService } from 'src/modules/origin/services';
import { ResponsePagingBase } from 'src/common/response/decorators/response.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.Trademark')
@Controller({
	version: '1',
	path: '/trademarks',
})
export class TrademarkPublicController {
	constructor(
		private readonly trademarkPublicService: TrademarkPublicService,
	) {}

	@ResponsePagingBase('origin.getAll')
	@Get()
	async getTrademarks(
		@Query() trademarkGetListDto: TrademarkGetListDto,
	): Promise<IResponsePaging> {
		return this.trademarkPublicService.getTrademarks(trademarkGetListDto);
	}
}
