import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationAvailableSearch,
	PaginationAvailableSort,
	PaginationFilterBoolean,
	PaginationPage,
	PaginationLimit,
	PaginationSearch,
	PaginationSort,
	PaginationFilterNumber,
	PaginationFilterEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IPaginationSort } from 'src/common/pagination/interfaces/pagination.interface';
import {
	ENUM_PERMISSION_MODULE,
	PERMISSION_DEFAULT_ACTIVE,
	PERMISSION_DEFAULT_AVAILABLE_SEARCH,
	PERMISSION_DEFAULT_AVAILABLE_SORT,
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
	PERMISSION_DEFAULT_SORT,
} from 'src/modules/permission/constants';

export class CartGetListDto implements PaginationListAbstract {
	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;
}
