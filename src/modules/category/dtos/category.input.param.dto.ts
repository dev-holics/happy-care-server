import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	readonly categoryId: string;
}
