import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationAvailableSearch,
	PaginationPage,
	PaginationLimit,
	PaginationSearch,
} from 'src/common/pagination/decorators/pagination.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';
import {
	PRODUCT_DEFAULT_AVAILABLE_SEARCH,
	SORT_OPTION_ENUM,
} from 'src/modules/product/constants';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';

export class ProductGetListDto implements PaginationListAbstract {
	@PaginationSearch(PRODUCT_DEFAULT_AVAILABLE_SEARCH)
	readonly search: Record<string, any>[];

	@ApiHideProperty()
	@PaginationAvailableSearch(PRODUCT_DEFAULT_AVAILABLE_SEARCH)
	readonly availableSearch: string[];

	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;

	@ApiProperty({
		example: shuffle(Object.values(SORT_OPTION_ENUM))[0],
		required: false,
		enum: SORT_OPTION_ENUM,
	})
	@IsEnum(SORT_OPTION_ENUM)
	@IsOptional()
	sortOption: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	@IsUUID()
	readonly categoryId?: string;
}
