import { Injectable } from '@nestjs/common';
import {
	PAGINATION_MAX_PAGE,
	PAGINATION_MAX_PER_PAGE,
} from 'src/common/pagination/constants/pagination.constant';
import { IPaginationService } from 'src/common/pagination/interfaces/pagination.service.interface';

@Injectable()
export class PaginationService implements IPaginationService {
	skip(page: number, perPage: number): number {
		page = page > PAGINATION_MAX_PAGE ? PAGINATION_MAX_PAGE : page;
		perPage = Math.min(perPage, PAGINATION_MAX_PER_PAGE);
		return (page - 1) * perPage;
	}

	totalPage(totalData: number, limit: number): number {
		let totalPage = Math.ceil(totalData / limit);
		totalPage = Math.max(1, totalPage);
		return Math.min(totalPage, PAGINATION_MAX_PER_PAGE);
	}
}
