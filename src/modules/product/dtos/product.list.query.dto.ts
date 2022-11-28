import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationAvailableSearch,
	PaginationPage,
	PaginationLimit,
	PaginationSearch,
} from 'src/common/pagination/decorators/pagination.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
	PRODUCT_DEFAULT_AVAILABLE_SEARCH,
	PRODUCT_DEFAULT_LIMIT,
	PRODUCT_DEFAULT_PAGE,
	SORT_OPTION_ENUM,
} from 'src/modules/product/constants';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { shuffle } from 'radash';

export class ProductGetListDto implements PaginationListAbstract {
	@PaginationSearch(PRODUCT_DEFAULT_AVAILABLE_SEARCH)
	readonly search: Record<string, any>[];

	@ApiHideProperty()
	@PaginationAvailableSearch(PRODUCT_DEFAULT_AVAILABLE_SEARCH)
	readonly availableSearch: string[];

	@PaginationPage(PRODUCT_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PRODUCT_DEFAULT_LIMIT)
	readonly limit: number;

	@ApiProperty({
		example: shuffle(Object.values(SORT_OPTION_ENUM))[0],
		required: false,
		enum: SORT_OPTION_ENUM,
	})
	@IsEnum(SORT_OPTION_ENUM)
	@IsOptional()
	sortOption: string;

	@IsOptional()
	@IsUUID()
	readonly categoryId?: string;

	@IsOptional()
	@IsUUID()
	readonly trademarkId?: string;

	@IsOptional()
	@IsUUID()
	readonly originId?: string;
}
