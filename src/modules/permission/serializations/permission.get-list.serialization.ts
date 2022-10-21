import { PartialType } from '@nestjs/swagger';
import { PermissionGetSerialization } from 'src/modules/permission/serializations/permission.get.serialization';

export class PermissionGetListSerialization extends PartialType(
	PermissionGetSerialization,
) {}
