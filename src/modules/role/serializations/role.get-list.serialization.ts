import { PartialType } from '@nestjs/swagger';
import { RoleGetSerialization } from 'src/modules/role/serializations/role.get.serialization';

export class RoleGetListSerialization extends PartialType(
	RoleGetSerialization,
) {}
