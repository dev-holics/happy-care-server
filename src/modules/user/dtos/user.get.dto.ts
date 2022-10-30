import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UserGetDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	userId: string;
}
