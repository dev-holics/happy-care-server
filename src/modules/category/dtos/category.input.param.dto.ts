import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryInputParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	readonly categoryId: string;
}
