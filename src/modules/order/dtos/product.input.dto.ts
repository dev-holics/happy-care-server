import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class ProductInputDto {
	@IsNotEmpty()
	@IsUUID()
	@Expose()
	productId: string;

	@IsNotEmpty()
	@IsInt()
	@Expose()
	quantity: number;
}
