import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductParamDto {
	@IsNotEmpty()
	@IsUUID()
	@IsString()
	productId: string;
}
