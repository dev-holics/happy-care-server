import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationSimpleListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationPage,
	PaginationLimit,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';

export class TrademarkGetListDto implements PaginationSimpleListAbstract {
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

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsUUID()
	readonly originId?: string;
}
