import { Injectable } from '@nestjs/common';
import { TrademarkPublicRepository } from 'src/modules/origin/repositories';
import { TrademarkEntity } from 'src/modules/origin/entities';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class TrademarkPublicService {
	constructor(
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	@ResponseBase('trademark.getAll')
	async getTrademarks(): Promise<IResponseBase> {
		const result = await this.trademarkPublicRepository.findAll({
			options: {
				relations: ['origin'],
			},
		});
		return this.paginationService.formatResult(result);
	}
}
