import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ProductBaseDto } from 'src/modules/product/dtos';

export class CartItemUpdateDto {
	// @ApiProperty({
	// 	example: 1,
	// 	required: false,
	// })
	// @Expose()
	// @IsInt()
	// @IsNotEmpty()
	// @Min(1)
	// quantity: number;

	// @ApiProperty({
	// 	required: false,
	// })
	// @IsUUID()
	// @IsNotEmpty()
	// productId: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsArray()
	@Type(() => ProductBaseDto)
	items: ProductBaseDto[];

	@ApiProperty({
		required: false,
	})
	@IsNumber()
	totalPrice?: number;

	@ApiProperty({
		required: false,
	})
	@IsNumber()
	totalQuantity?: number;
}
