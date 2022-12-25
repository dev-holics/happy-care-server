import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IProductLogExport } from 'src/modules/product/interfaces';

export class ProductLogExportDto implements IProductLogExport {
	@ApiProperty({
		example: faker.random.numeric(2),
		required: true,
	})
	@IsNotEmpty()
	@Type(() => Number)
	quantity: number;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	productConsignmentId: string;

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
