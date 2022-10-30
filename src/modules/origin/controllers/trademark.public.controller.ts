import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { TrademarkPublicService } from 'src/modules/origin/services';
import { TrademarkEntity } from 'src/modules/origin/entities';
import { Response } from 'src/common/response/decorators/response.decorator';

@ApiTags('Public.Trademark')
@Controller({
	version: '1',
	path: '/trademarks',
})
export class TrademarkPublicController {
	constructor(
		private readonly trademarkPublicService: TrademarkPublicService,
	) {}

	@Response('trademark.getAll', {})
	@Get()
	async getTrademarks(): Promise<TrademarkEntity[]> {
		return this.trademarkPublicService.getTrademarks();
	}
}
