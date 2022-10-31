import { Injectable } from '@nestjs/common';
import { TrademarkAdminRepository } from 'src/modules/origin/repositories';
import {
	TrademarkCreateBodyDto,
	TrademarkParamDto,
	TrademarkUpdateBodyDto,
} from 'src/modules/origin/dtos';

@Injectable()
export class TrademarkAdminService {
	constructor(
		private readonly trademarkAdminRepository: TrademarkAdminRepository,
	) {}

	async createTrademark(trademarkCreateBodyDto: TrademarkCreateBodyDto) {
		return this.trademarkAdminRepository.createOne({
			data: {
				name: trademarkCreateBodyDto.name,
				origin: {
					id: trademarkCreateBodyDto.originId,
				},
			},
		});
	}

	async updateTrademark(
		trademarkParamDto: TrademarkParamDto,
		trademarkUpdateBodyDto: TrademarkUpdateBodyDto,
	) {
		return this.trademarkAdminRepository.updateOne({
			criteria: {
				id: trademarkParamDto.trademarkId,
			},
			data: {
				name: trademarkUpdateBodyDto.name,
				origin: {
					id: trademarkUpdateBodyDto.originId,
				},
			},
		});
	}

	async deleteTrademark(trademarkParamDto: TrademarkParamDto) {
		return this.trademarkAdminRepository.hardDelete({
			id: trademarkParamDto.trademarkId,
		});
	}
}
