import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { PERMISSIONS } from 'src/common/auth/constants';

@Injectable()
export class PermissionSeed {
	constructor(
		private readonly permissionRepository: PermissionRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	@Command({
		command: 'insert:permission',
		describe: 'insert permissions',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await Promise.all(
				Object.values(PERMISSIONS).map(permission => {
					return this.permissionRepository.createOne(permission);
				}),
			);
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
		command: 'remove:permission',
		describe: 'remove permissions',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.permissionRepository.hardDelete({});
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
