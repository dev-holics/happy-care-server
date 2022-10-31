import { TrademarkGetListDto } from 'src/modules/origin/dtos';
import { Injectable } from '@nestjs/common';
import { TrademarkPublicRepository } from 'src/modules/origin/repositories';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ILike } from 'typeorm';

@Injectable()
export class TrademarkPublicService {
	constructor(
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getTrademarks(
		trademarkGetListDto: TrademarkGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.trademarkPublicRepository.count({});
		const search = trademarkGetListDto.searchData
			? trademarkGetListDto.searchData.trim()
			: null;
		const result = await this.trademarkPublicRepository.findMany({
			where: [
				{
					name: search ? ILike(`%${search}%`) : undefined,
					origin: {
						id: trademarkGetListDto.originId
							? trademarkGetListDto.originId
							: undefined,
					},
				},
				{
					origin: {
						id: trademarkGetListDto.originId
							? trademarkGetListDto.originId
							: undefined,
						name: search ? ILike(`%${search}%`) : undefined,
					},
				},
			],
			options: {
				relations: ['origin'],
				page: trademarkGetListDto.page,
				limit: trademarkGetListDto.limit,
				order: {
					createdAt: 'DESC',
				},
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			trademarkGetListDto.page,
			trademarkGetListDto.limit,
			null,
			null,
			result,
		);
	}
}
