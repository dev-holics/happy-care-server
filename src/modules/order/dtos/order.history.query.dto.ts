import { PaginationSimpleListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { faker } from '@faker-js/faker';
import {
	PaginationLimit,
	PaginationPage,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';
import { shuffle } from 'radash';
import { Type } from 'class-transformer';
import { ENUM_ORDER_STATUS } from 'src/modules/order/constants/order.constant';

export class OrderHistoryQueryDto implements PaginationSimpleListAbstract {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly branchId?: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_ORDER_STATUS))[0],
		required: false,
		enum: ENUM_ORDER_STATUS,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly status?: string;

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
