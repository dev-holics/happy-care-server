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

export class PermissionGetListDto implements PaginationListAbstract {
	@PaginationSearch(PERMISSION_DEFAULT_AVAILABLE_SEARCH)
	readonly search: Record<string, any>[];

	@ApiHideProperty()
	@PaginationAvailableSearch(PERMISSION_DEFAULT_AVAILABLE_SEARCH)
	readonly availableSearch: string[];

	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;

	@PaginationSort(PERMISSION_DEFAULT_SORT, PERMISSION_DEFAULT_AVAILABLE_SORT)
	readonly sort: IPaginationSort;

	@ApiHideProperty()
	@PaginationAvailableSort(PERMISSION_DEFAULT_AVAILABLE_SORT)
	readonly availableSort: string[];

	@ApiProperty({
		example: '2,4,7',
		description: 'Filter permission by codes',
	})
	@PaginationFilterNumber()
	readonly code?: string;

	@ApiProperty({
		example: 'user,product',
		description: 'Filter permission by modules (user,product,...)',
	})
	@PaginationFilterEnum(ENUM_PERMISSION_MODULE)
	readonly module?: string;

	@ApiProperty({
		example: true,
		description: 'Filter permission by active status',
	})
	@PaginationFilterBoolean(PERMISSION_DEFAULT_ACTIVE)
	readonly isActive?: boolean;
}
