import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IRoleEntity } from 'src/modules/role/interfaces/role.entity.interface';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { snakeCase } from 'change-case';

@Entity('roles')
export class RoleEntity extends DatabaseEntityAbstract implements IRoleEntity {
	@Column({
		length: 100,
		unique: true,
	})
	name: string;

	@Column({
		length: 2000,
		nullable: true,
	})
	description: string;

	@Column({
		enum: ENUM_AUTH_ACCESS_LEVEL,
	})
	accessLevel: string;

	@OneToMany(() => UserEntity, user => user.role)
	users: UserEntity[];

	@ManyToMany(() => PermissionEntity, permission => permission.roles)
	@JoinTable({
		name: 'roles_permissions',
		joinColumn: {
			name: snakeCase('roleId'),
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: snakeCase('permissionId'),
			referencedColumnName: 'id',
		},
	})
	permissions: PermissionEntity[];
}
