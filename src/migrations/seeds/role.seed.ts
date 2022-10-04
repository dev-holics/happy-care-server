import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Injectable()
export class RoleSeed {
	constructor(
		private readonly roleRepository: RoleRepository,
		private readonly permissionRepository: PermissionRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	@Command({
		command: 'insert:role',
		describe: 'insert roles',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const permissions: PermissionEntity[] =
				await this.permissionRepository.findAll();

			for (const accessLevel of Object.values(ENUM_AUTH_ACCESS_LEVEL)) {
				const role = new RoleEntity();
				switch (accessLevel) {
					case ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN:
						role.name = 'Super admin';
						role.description = 'Role of super admin';
						role.accessLevel = ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN;
						role.permissions = permissions;
						break;
					case ENUM_AUTH_ACCESS_LEVEL.ADMIN:
						role.name = 'Admin';
						role.description = 'Role of admin';
						role.accessLevel = ENUM_AUTH_ACCESS_LEVEL.ADMIN;
						break;
					case ENUM_AUTH_ACCESS_LEVEL.PHARMACIST:
						role.name = 'Pharmacist';
						role.description = 'Role of pharmacist';
						role.accessLevel = ENUM_AUTH_ACCESS_LEVEL.PHARMACIST;
						break;
					case ENUM_AUTH_ACCESS_LEVEL.CUSTOMER:
						role.name = 'Customer';
						role.description = 'Role of customer';
						role.accessLevel = ENUM_AUTH_ACCESS_LEVEL.CUSTOMER;
						break;
					default:
						break;
				}

				await role.save();
			}
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw new Error('Method not implemented.');
		} finally {
			await queryRunner.release();
			process.exit();
		}

		return;
	}

	@Command({
		command: 'remove:role',
		describe: 'remove roles',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.roleRepository.getRepository().delete({});
		} catch (err: any) {
			await queryRunner.rollbackTransaction();
			throw new Error('Method not implemented.');
		} finally {
			await queryRunner.release();
			process.exit();
		}

		return;
	}
}
