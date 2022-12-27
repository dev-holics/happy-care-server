import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { shuffle } from 'radash';
import { ProductInputDto } from '.';
import {
	ENUM_ORDER_TYPES,
	ENUM_PAYMENT_TYPES,
} from 'src/modules/order/constants/order.constant';

export class OrderCreateBodyDto {
	@ApiProperty({
		example: 100000,
		required: true,
	})
	@IsNumber()
	totalPrice: number;

	@ApiProperty({
		example: 20000,
		required: false,
	})
	@IsNumber()
	shipPrice: number;

	@ApiProperty({
		example: '',
		required: true,
	})
	@IsUUID()
	@IsOptional()
	branchId: string;

	@ApiProperty({
		example: '',
		required: true,
	})
	@IsUUID()
	userSettingId: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_PAYMENT_TYPES))[0],
		required: true,
		enum: ENUM_PAYMENT_TYPES,
	})
	@IsEnum(ENUM_PAYMENT_TYPES)
	paymentType: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_ORDER_TYPES))[0],
		required: true,
		enum: ENUM_ORDER_TYPES,
	})
	@IsEnum(ENUM_ORDER_TYPES)
	orderType: string;

	@ApiProperty({
		required: true,
	})
	@Type(() => ProductInputDto)
	products: ProductInputDto[];
}
