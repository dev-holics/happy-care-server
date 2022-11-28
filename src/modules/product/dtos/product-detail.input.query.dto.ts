import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationAvailableSearch,
	PaginationLimit,
	PaginationPage,
	PaginationSearch,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	PRODUCT_DEFAULT_LIMIT,
	PRODUCT_DEFAULT_PAGE,
	PRODUCT_DETAIL_DEFAULT_AVAILABLE_SEARCH,
} from 'src/modules/product/constants';
import { IsOptional, IsUUID } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductDetailInputQueryDto implements PaginationListAbstract {
	@PaginationSearch(PRODUCT_DETAIL_DEFAULT_AVAILABLE_SEARCH)
	readonly search: Record<string, any>[];

	@ApiHideProperty()
	@PaginationAvailableSearch(PRODUCT_DETAIL_DEFAULT_AVAILABLE_SEARCH)
	readonly availableSearch: string[];

	@PaginationPage(PRODUCT_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PRODUCT_DEFAULT_LIMIT)
	readonly limit: number;

	@IsOptional()
	@IsUUID()
	readonly branchId?: string;
}
