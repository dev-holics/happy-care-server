import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationLimit,
	PaginationPage,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
	ENUM_TRANSACTION_TYPES,
	PRODUCT_DEFAULT_LIMIT,
	PRODUCT_DEFAULT_PAGE,
} from 'src/modules/product/constants';
import { ApiProperty } from '@nestjs/swagger';
import { shuffle } from 'radash';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';

export class ProductLogListQueryDto implements PaginationListAbstract {
	@ApiProperty({
		example: faker.date.past(),
		required: false,
	})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	transactionDate: Date;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_TRANSACTION_TYPES))[0],
		required: false,
		enum: ENUM_TRANSACTION_TYPES,
	})
	@IsEnum(ENUM_TRANSACTION_TYPES)
	@IsOptional()
	type: string;

	@IsOptional()
	@IsUUID()
	readonly branchId?: string;

	@PaginationPage(PRODUCT_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PRODUCT_DEFAULT_LIMIT)
	readonly limit: number;
}
