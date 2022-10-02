import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { UserPublicRepository } from 'src/modules/user/repositories/user.public.repository';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants';
import { IUserCreate } from 'src/modules/user/interfaces/user.api.interface';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { IUserCheckExist } from 'src/modules/user/interfaces/user.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants';
import { AuthService } from 'src/common/auth/services/auth.service';

@Injectable()
export class UserPublicService {
	constructor(
		private readonly userPublicRepository: UserPublicRepository,
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	async signUpNewUser(userSignUpData: IUserCreate) {
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
