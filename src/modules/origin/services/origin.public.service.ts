import { Injectable } from '@nestjs/common';
import {
	OriginPublicRepository,
	TrademarkPublicRepository,
} from 'src/modules/origin/repositories';
import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { OriginParamDto } from 'src/modules/origin/dtos';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class OriginPublicService {
	constructor(
		private readonly originPublicRepository: OriginPublicRepository,
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getOrigins(): Promise<IResponseBase> {
		const result = await this.originPublicRepository.findAll({});
		return this.paginationService.formatResult(result);
	}

	async getTrademarksByOriginId(
		originParamDto: OriginParamDto,
	): Promise<IResponseBase> {
		const result = await this.trademarkPublicRepository.findAll({
			where: {
				origin: {
					id: originParamDto.originId,
				},
			},
		});
		return this.paginationService.formatResult(result);
	}
}
