import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDetailParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	productId: string;
}
