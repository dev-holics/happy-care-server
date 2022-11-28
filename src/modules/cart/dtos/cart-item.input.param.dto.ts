import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemInputParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	itemId: string;
}
