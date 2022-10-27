import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CartCreateDto {
	@ApiProperty({
		example: 1,
		required: false,
	})
	@Expose()
	@IsInt()
	@IsNotEmpty()
	@Min(1)
	quantity: number;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@Expose()
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	productId: string;
}
