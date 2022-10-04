import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { AuthService } from 'src/common/auth/services/auth.service';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Injectable()
export class UserSeed {
	constructor(
		private readonly authService: AuthService,
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	@Command({
		command: 'insert:user',
		describe: 'insert users',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const password = await this.authService.createPassword('Ductruong@123');

			const role: RoleEntity = await this.roleRepository.findOneByQuery({
				accessLevel: ENUM_AUTH_ACCESS_LEVEL.SUPER_ADMIN,
			});

			await Promise.all([
				this.userRepository.createOne({
					phoneNumber: '0763657036',
					password: password.passwordHash,
					email: 'superadmin@gmail.com',
					fullname: 'Duc Truong',
					gender: ENUM_GENDERS.MALE,
					role: role || undefined,
				}),
				this.userRepository.createOne({
					phoneNumber: '0812345678',
					password: password.passwordHash,
					email: 'admin@gmail.com',
					fullname: 'Ai Linh',
					gender: ENUM_GENDERS.FEMALE,
				}),
				this.userRepository.createOne({
					phoneNumber: '0712345678',
					password: password.passwordHash,
					email: 'pharmacist@gmail.com',
					fullname: 'Nhu Tri',
					gender: ENUM_GENDERS.MALE,
				}),
				this.userRepository.createOne({
					phoneNumber: '0612345678',
					password: password.passwordHash,
					email: 'customer@gmail.com',
					fullname: 'Loc Nguyen',
					gender: ENUM_GENDERS.MALE,
				}),
			]);
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
		command: 'remove:user',
		describe: 'remove users',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.userRepository.hardDelete({});
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
