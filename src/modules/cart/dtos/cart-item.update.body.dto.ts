import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CartItemUpdateDto {
	@ApiProperty({
		example: 1,
		required: false,
	})
	@Expose()
	@IsInt()
	@IsNotEmpty()
	@Min(1)
	quantity: number;
}
