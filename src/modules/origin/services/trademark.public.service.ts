import { Injectable } from '@nestjs/common';
import { TrademarkPublicRepository } from 'src/modules/origin/repositories';
import { TrademarkEntity } from 'src/modules/origin/entities';

@Injectable()
export class TrademarkPublicService {
	constructor(
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
	) {}

	async getTrademarks(): Promise<TrademarkEntity[]> {
		return this.trademarkPublicRepository.findAll({});
	}
}
