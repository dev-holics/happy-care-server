import { PickType } from '@nestjs/swagger';
import { PermissionCreateDto } from 'src/modules/permission/dtos/permission.create.dto';

export class PermissionUpdateDto extends PickType(PermissionCreateDto, [
	'name',
	'description',
]) {}
