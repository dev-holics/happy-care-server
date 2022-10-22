import { SORT_OPTION_ENUM } from 'src/modules/product/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { shuffle } from 'radash';
import { faker } from '@faker-js/faker';

export class ProductInputQueryDto {
	@ApiProperty({
		example: 'Livespo',
		required: false,
	})
	@IsOptional()
	@IsString()
	trademark: string;

	@ApiProperty({
		example: 'Thụy Điển',
		required: false,
	})
	@IsOptional()
	@IsString()
	origin: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	@IsOptional()
	@IsUUID()
	category: string;

	@ApiProperty({
		example: shuffle(Object.values(SORT_OPTION_ENUM))[0],
		required: false,
		enum: SORT_OPTION_ENUM,
	})
	@IsEnum(SORT_OPTION_ENUM)
	@IsOptional()
	sortOption: string;

	@ApiProperty({
		example: '15',
		required: false,
	})
	@IsOptional()
	@IsString()
	limit: string;

	@ApiProperty({
		example: '3',
		required: false,
	})
	@IsOptional()
	@IsString()
	page: string;
}
