import { PaginationSimpleListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationPage,
	PaginationLimit,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OriginGetListDto implements PaginationSimpleListAbstract {
	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly search: string;
}
