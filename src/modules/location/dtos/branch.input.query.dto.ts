import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationPage,
	PaginationLimit,
} from 'src/common/pagination/decorators/pagination.decorator';

import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';

export class BranchGetListDto implements PaginationListAbstract {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsUUID()
	readonly cityId?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsUUID()
	readonly districtId?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
	searchData: string;

	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;
}
