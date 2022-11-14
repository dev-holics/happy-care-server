import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { UserPublicRepository } from 'src/modules/user/repositories/user.public.repository';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { IUserCheckExist } from 'src/modules/user/interfaces/user.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserSignUpDto } from 'src/modules/user/dtos';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants';

@Injectable()
export class UserPublicService {
	constructor(
		private readonly userPublicRepository: UserPublicRepository,
		private readonly roleRepository: RoleRepository,
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	async signUpNewUser(userSignUpData: UserSignUpDto) {
		const role: RoleEntity = await this.roleRepository.findOne({
			where: {
				accessLevel: ENUM_AUTH_ACCESS_LEVEL.CUSTOMER,
			},
		});

		if (!role) {
			throw new NotFoundException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
				message: 'role.error.notFound',
			});
		}

		const checkUserExist: IUserCheckExist = await this.userService.checkExist(
			userSignUpData.phoneNumber,
		);

		if (checkUserExist.phoneNumber) {
			throw new BadRequestException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PHONE_NUMBER_EXIST_ERROR,
				message: 'user.error.phoneNumberExist',
			});
		}

		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const hashedPassword = await this.authService.createPassword(
				userSignUpData.password,
			);

			await this.userPublicRepository.createOne({
				...userSignUpData,
				role,
				password: hashedPassword.passwordHash,
			});

			return;
		} catch (err: any) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException({
				statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
				message: 'http.serverError.internalServerError',
				error: err.message,
			});
		} finally {
			await queryRunner.release();
		}
	}
}
