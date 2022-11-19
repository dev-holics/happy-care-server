import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductBaseDto {
	@IsNotEmpty()
	@IsUUID()
	productId: string;

	@IsString()
	productName?: string;

	price?: string;

	@IsNotEmpty()
	@IsInt()
	quantity: number;

	@IsString()
	packingSpec?: string;

	@IsString()
	imageUrl?: string;

	@IsNumber()
	discount?: number;
}
