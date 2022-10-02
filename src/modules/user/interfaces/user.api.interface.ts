import { RoleEntity } from 'src/modules/role/entities/role.entity';

export interface IUserCreate {
	readonly phoneNumber: string;

	readonly password: string;

	readonly fullname: string;

	readonly email?: string;

	readonly gender?: string;

	readonly role: RoleEntity;
}
