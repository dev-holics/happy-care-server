import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CartInputParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	cartId: string;
}
