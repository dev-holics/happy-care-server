import { Injectable } from '@nestjs/common';
import {
	OriginPublicRepository,
	TrademarkPublicRepository,
} from 'src/modules/origin/repositories';
import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { OriginParamDto } from 'src/modules/origin/dtos';

@Injectable()
export class OriginPublicService {
	constructor(
		private readonly originPublicRepository: OriginPublicRepository,
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
	) {}

	async getOrigins(): Promise<OriginEntity[]> {
		return this.originPublicRepository.findAll({});
	}

	async getTrademarksByOriginId(
		originParamDto: OriginParamDto,
	): Promise<TrademarkEntity[]> {
		return this.trademarkPublicRepository.findAll({
			where: {
				id: originParamDto.origintId,
			},
		});
	}
}
