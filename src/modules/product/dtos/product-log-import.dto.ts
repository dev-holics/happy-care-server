import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IProductLogImport } from 'src/modules/product/interfaces';

export class ProductLogImportDto implements IProductLogImport {
	@ApiProperty({
		example: faker.random.numeric(2),
		required: true,
	})
	@IsNotEmpty()
	@Type(() => Number)
	quantity: number;

	@ApiProperty({
		example: '2024-12-05',
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	expired: Date;

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
