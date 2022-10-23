import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionGetDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	permissionId: string;
}
