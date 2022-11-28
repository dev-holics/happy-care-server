import { PaginationSimpleListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { shuffle } from 'radash';
import {
	ENUM_ORDER_STATUS,
	ENUM_PAYMENT_TYPES,
} from 'src/modules/order/constants/order.constant';
import { Type } from 'class-transformer';
import {
	PaginationLimit,
	PaginationPage,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';

export class OrderListQueryDto implements PaginationSimpleListAbstract {
	@ApiProperty({
		example: shuffle(Object.values(ENUM_PAYMENT_TYPES))[0],
		required: false,
		enum: ENUM_PAYMENT_TYPES,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly paymentType?: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_ORDER_STATUS))[0],
		required: false,
		enum: ENUM_ORDER_STATUS,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly status?: string;

	@ApiProperty({
		example: faker.date.past(),
		required: false,
	})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	startDate: Date;

	@ApiProperty({
		example: faker.date.recent(),
		required: false,
	})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	endDate: Date;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly branchId?: string;

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
