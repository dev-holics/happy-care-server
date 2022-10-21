import { Injectable } from '@nestjs/common';
import {
	PAGINATION_MAX_PAGE,
	PAGINATION_MAX_PER_PAGE,
} from 'src/common/pagination/constants/pagination.constant';
import { IPaginationService } from 'src/common/pagination/interfaces/pagination.service.interface';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@Injectable()
export class PaginationService implements IPaginationService {
	skip(page: number, limit: number): number {
		page = page > PAGINATION_MAX_PAGE ? PAGINATION_MAX_PAGE : page;
		limit = Math.min(limit, PAGINATION_MAX_PER_PAGE);
		return (page - 1) * limit;
	}

	totalPage(totalData: number, limit: number): number {
		let totalPage = Math.ceil(totalData / limit);
		totalPage = Math.max(1, totalPage);
		return Math.min(totalPage, PAGINATION_MAX_PER_PAGE);
	}

	formatPaginationResult(
		page: number,
		limit: number,
		availableSearch: string[],
		availableSort: string[],
		data: any[],
	): IResponsePaging {
		const totalData = data.length;

		return {
			data,
			limit,
			availableSearch,
			availableSort,
			totalData,
			currentPage: page,
			totalPage: this.totalPage(totalData, limit),
		};
	}
}
