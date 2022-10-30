import { Injectable } from '@nestjs/common';
import {
	OriginPublicRepository,
	TrademarkPublicRepository,
} from 'src/modules/origin/repositories';
import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import { OriginGetListDto, OriginParamDto } from 'src/modules/origin/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class OriginPublicService {
	constructor(
		private readonly originPublicRepository: OriginPublicRepository,
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getOrigins(
		originGetListDto: OriginGetListDto,
	): Promise<IResponsePaging> {
		const result = await this.originPublicRepository.findMany({
			options: {
				page: originGetListDto.page,
				limit: originGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			originGetListDto.page,
			originGetListDto.limit,
			null,
			null,
			result,
		);
	}

	async getTrademarksByOriginId(
		originParamDto: OriginParamDto,
		originGetListDto: OriginGetListDto,
	): Promise<IResponsePaging> {
		const result = await this.trademarkPublicRepository.findMany({
			where: {
				origin: {
					id: originParamDto.originId,
				},
			},
			options: {
				page: originGetListDto.page,
				limit: originGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			originGetListDto.page,
			originGetListDto.limit,
			null,
			null,
			result,
		);
	}
}
