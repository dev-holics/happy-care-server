import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class RoleGetDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	roleId: string;
}
