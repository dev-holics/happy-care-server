import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class OriginParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	originId: string;
}
