import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';

@Injectable()
export class RoleSeed {
	constructor(
		private readonly roleRepository: RoleRepository,
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
			await Promise.all([
				this.roleRepository.createOne({
					name: 'Super admin',
					description: 'Role of super admin',
					accessLevel: ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN,
				}),
				this.roleRepository.createOne({
					name: 'Admin',
					description: 'Role of admin',
					accessLevel: ENUM_AUTH_ACCESS_LEVEL.ADMIN,
				}),
				this.roleRepository.createOne({
					name: 'Pharmacist',
					description: 'Role of pharmacist',
					accessLevel: ENUM_AUTH_ACCESS_LEVEL.PHARMACIST,
				}),
				this.roleRepository.createOne({
					name: 'Customer',
					description: 'Role of customer',
					accessLevel: ENUM_AUTH_ACCESS_LEVEL.CUSTOMER,
				}),
			]);
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw new Error('Method not implemented.');
		} finally {
			await queryRunner.release();
			console.info('DONE!!');
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
			console.info('DONE!!');
		}

		return;
	}
}
