import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';

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
				await this.permissionRepository.findAll({
					options: {
						select: {
							id: true,
							name: true,
							description: true,
							module: true,
							isActive: true,
							code: true,
						},
					},
				});

			for (const accessLevel of Object.values(ENUM_AUTH_ACCESS_LEVEL)) {
				switch (accessLevel) {
					case ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN:
						await this.roleRepository.createOne({
							data: {
								permissions,
								name: 'Super admin',
								description: 'Role of super admin',
								accessLevel: ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN,
							},
							options: {
								transaction: true,
							},
						});
						break;
					case ENUM_AUTH_ACCESS_LEVEL.ADMIN:
						await this.roleRepository.createOne({
							data: {
								permissions,
								name: 'Admin',
								description: 'Role of admin',
								accessLevel: ENUM_AUTH_ACCESS_LEVEL.ADMIN,
							},
							options: {
								transaction: true,
							},
						});
						break;
					case ENUM_AUTH_ACCESS_LEVEL.PHARMACIST:
						await this.roleRepository.createOne({
							data: {
								permissions,
								name: 'Pharmacist',
								description: 'Role of pharmacist',
								accessLevel: ENUM_AUTH_ACCESS_LEVEL.PHARMACIST,
							},
							options: {
								transaction: true,
							},
						});
						break;
					case ENUM_AUTH_ACCESS_LEVEL.CUSTOMER:
						await this.roleRepository.createOne({
							data: {
								permissions,
								name: 'Customer',
								description: 'Role of customer',
								accessLevel: ENUM_AUTH_ACCESS_LEVEL.CUSTOMER,
							},
							options: {
								transaction: true,
							},
						});
						break;
					default:
						break;
				}
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
			await this.roleRepository.hardDelete({});
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
