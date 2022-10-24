import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	productId: string;
}
