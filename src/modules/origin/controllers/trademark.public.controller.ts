import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { TrademarkPublicService } from 'src/modules/origin/services';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.Trademark')
@Controller({
	version: '1',
	path: '/trademarks',
})
export class TrademarkPublicController {
	constructor(
		private readonly trademarkPublicService: TrademarkPublicService,
	) {}

	@ResponseBase('trademark.getAll')
	@Get()
	async getTrademarks(): Promise<IResponseBase> {
		return this.trademarkPublicService.getTrademarks();
	}
}
