import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

export interface IRoleEntity {
	name: string;

	description: string;

	accessLevel: string;

	users: UserEntity[];

	permissions: PermissionEntity[];
}
