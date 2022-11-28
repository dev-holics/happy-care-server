import { IProductLogCreate } from 'src/modules/product/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { shuffle } from 'radash';
import { ENUM_TRANSACTION_TYPES } from 'src/modules/product/constants';

export class ProductLogCreateDto implements IProductLogCreate {
	@ApiProperty({
		example: faker.random.numeric(2),
		required: true,
	})
	@IsNotEmpty()
	@Type(() => Number)
	readonly quantity: number;

	@ApiProperty({
		example: faker.date.past(),
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	transactionDate: Date;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_TRANSACTION_TYPES))[0],
		required: true,
		enum: ENUM_TRANSACTION_TYPES,
	})
	@IsEnum(ENUM_TRANSACTION_TYPES)
	@IsNotEmpty()
	type: ENUM_TRANSACTION_TYPES;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	branchId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	productId: string;
}
