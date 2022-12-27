import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { shuffle } from 'radash';
import { ENUM_PAYMENT_TYPES } from 'src/modules/order/constants/order.constant';
import { Type } from 'class-transformer';
import { ProductInputDto } from 'src/modules/order/dtos/product.input.dto';

export class OrderAdminCreateBodyDto {
	@ApiProperty({
		example: 100000,
		required: true,
	})
	@IsNumber()
	totalPrice: number;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_PAYMENT_TYPES))[0],
		required: true,
		enum: ENUM_PAYMENT_TYPES,
	})
	@IsEnum(ENUM_PAYMENT_TYPES)
	paymentType: string;

	@ApiProperty({
		required: true,
	})
	@Type(() => ProductInputDto)
	products: ProductInputDto[];
}
