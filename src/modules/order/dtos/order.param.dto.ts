import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderParamDto {
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	readonly orderId: string;
}
