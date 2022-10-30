import { OriginGetListDto } from 'src/modules/origin/dtos';
import { Injectable } from '@nestjs/common';
import { TrademarkPublicRepository } from 'src/modules/origin/repositories';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class TrademarkPublicService {
	constructor(
		private readonly trademarkPublicRepository: TrademarkPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	@ResponseBase('trademark.getAll')
	async getTrademarks(
		originGetListDto: OriginGetListDto,
	): Promise<IResponsePaging> {
		const result = await this.trademarkPublicRepository.findMany({
			options: {
				relations: ['origin'],
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
