import { RoleEntity } from 'src/modules/role/entities/role.entity';

export interface IPermissionEntity {
	name: string;

	code: number;

	module: string;

	description: string;

	roles: RoleEntity[];
}
