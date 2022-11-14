import { Injectable } from '@nestjs/common';
import {
	OriginPublicRepository,
	TrademarkPublicRepository,
} from 'src/modules/origin/repositories';
import { OriginGetListDto, OriginParamDto } from 'src/modules/origin/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ILike } from 'typeorm';

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
		const { search } = originGetListDto;

		const totalData = await this.originPublicRepository.count({
			where: {
				name: search ? ILike(`%${search}%`) : undefined,
			},
		});

		const result = await this.originPublicRepository.findMany({
			where: {
				name: search ? ILike(`%${search}%`) : undefined,
			},
			options: {
				page: originGetListDto.page,
				limit: originGetListDto.limit,
				order: {
					createdAt: 'DESC',
				},
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
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
		const totalData = await this.originPublicRepository.count({});
		const result = await this.trademarkPublicRepository.findMany({
			where: {
				origin: {
					id: originParamDto.originId,
				},
			},
			options: {
				page: originGetListDto.page,
				limit: originGetListDto.limit,
				order: {
					createdAt: 'DESC',
				},
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			originGetListDto.page,
			originGetListDto.limit,
			null,
			null,
			result,
		);
	}
}
