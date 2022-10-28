import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { TrademarkPublicService } from 'src/modules/origin/services';
import { TrademarkEntity } from 'src/modules/origin/entities';

@ApiTags('Public.Trademark')
@Controller({
	version: '1',
	path: '/trademarks',
})
export class TrademarkPublicController {
	constructor(
		private readonly trademarkPublicService: TrademarkPublicService,
	) {}

	@Get()
	async getTrademarks(): Promise<TrademarkEntity[]> {
		return this.trademarkPublicService.getTrademarks();
	}
}
