import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductConsignmentDto {
	@IsNotEmpty()
	@IsUUID()
	@Expose()
	productConsignmentId: string;

	@IsNotEmpty()
	@IsInt()
	@Expose()
	quantity: number;
}
