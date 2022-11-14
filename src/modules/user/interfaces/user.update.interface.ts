import { RoleEntity } from 'src/modules/role/entities/role.entity';

export interface IUserUpdate {
	readonly fullname: string;

	readonly email?: string;

	readonly gender?: string;

	readonly role: RoleEntity;
}
