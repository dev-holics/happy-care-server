import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CartInputUpdateDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	customerId: string;
}
