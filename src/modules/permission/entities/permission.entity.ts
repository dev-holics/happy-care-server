import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IPermissionEntity } from 'src/modules/permission/interfaces/permission.entity.interface';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Entity('permissions')
export class PermissionEntity
	extends DatabaseEntityAbstract
	implements IPermissionEntity
{
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
		unique: true,
		unsigned: true,
	})
	code: number;

	@Column({
		length: 2000,
	})
	module: string;

	@ManyToMany(() => RoleEntity, role => role)
	@JoinTable({
		name: 'roles_permissions',
		joinColumn: {
			name: snakeCase('permissionId'),
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: snakeCase('roleId'),
			referencedColumnName: 'id',
		},
	})
	roles: RoleEntity[];
}
