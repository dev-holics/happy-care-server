import { PaginationSimpleListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationPage,
	PaginationLimit,
} from 'src/common/pagination/decorators/pagination.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
	PRODUCT_DEFAULT_LIMIT,
	PRODUCT_DEFAULT_PAGE,
	SORT_OPTION_ENUM,
} from 'src/modules/product/constants';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { shuffle } from 'radash';
import { faker } from '@faker-js/faker';

export class ProductGetListDto implements PaginationSimpleListAbstract {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly search: string;

	@PaginationPage(PRODUCT_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PRODUCT_DEFAULT_LIMIT)
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
		example: 'Đau đầu',
		required: false,
	})
	@IsString()
	@IsOptional()
	readonly tag?: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly categoryId?: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly trademarkId?: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly originId?: string;
}
