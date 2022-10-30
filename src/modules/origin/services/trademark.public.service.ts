import { TrademarkGetListDto } from 'src/modules/origin/dtos';
import { Injectable } from '@nestjs/common';
import { TrademarkPublicRepository } from 'src/modules/origin/repositories';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ILike } from 'typeorm';

@Injectable()
export class TrademarkPublicService {
	constructor(
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	@ResponseBase('trademark.getAll')
	async getTrademarks(
		trademarkGetListDto: TrademarkGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.trademarkPublicRepository.count({});
		const search = trademarkGetListDto.searchData.trim();
		const result = await this.trademarkPublicRepository.findMany({
			where: [
				{
					name: ILike(`%${search}%`),
				},
				{
					origin: {
						name: ILike(`%${search}%`),
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
