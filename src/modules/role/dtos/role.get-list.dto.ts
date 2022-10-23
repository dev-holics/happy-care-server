import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationAvailableSearch,
	PaginationAvailableSort,
	PaginationFilterBoolean,
	PaginationFilterEnum,
	PaginationLimit,
	PaginationPage,
	PaginationSearch,
	PaginationSort,
} from 'src/common/pagination/decorators/pagination.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IPaginationSort } from 'src/common/pagination/interfaces/pagination.interface';
import {
	ROLE_DEFAULT_ACTIVE,
	ROLE_DEFAULT_AVAILABLE_SEARCH,
	ROLE_DEFAULT_AVAILABLE_SORT,
	ROLE_DEFAULT_LIMIT,
	ROLE_DEFAULT_PAGE,
	ROLE_DEFAULT_SORT,
} from 'src/modules/role/constants';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';

export class RoleGetListDto implements PaginationListAbstract {
	@PaginationSearch(ROLE_DEFAULT_AVAILABLE_SEARCH)
	readonly search: Record<string, any>[];

	@ApiHideProperty()
	@PaginationAvailableSearch(ROLE_DEFAULT_AVAILABLE_SEARCH)
	readonly availableSearch: string[];

	@PaginationPage(ROLE_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(ROLE_DEFAULT_LIMIT)
	readonly limit: number;

	@PaginationSort(ROLE_DEFAULT_SORT, ROLE_DEFAULT_AVAILABLE_SORT)
	readonly sort: IPaginationSort;

	@ApiHideProperty()
	@PaginationAvailableSort(ROLE_DEFAULT_AVAILABLE_SORT)
	readonly availableSort: string[];

	@ApiProperty({
		example: 'admin,pharmacist',
		description: 'Filter role by access level (admin,pharmacist,...)',
	})
	@PaginationFilterEnum(ENUM_AUTH_ACCESS_LEVEL)
	readonly accessLevel?: string;

	@ApiProperty({
		example: true,
		description: 'Filter role by active status',
	})
	@PaginationFilterBoolean(ROLE_DEFAULT_ACTIVE)
	readonly isActive?: boolean;
}
