import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CityParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	citytId: string;
}
