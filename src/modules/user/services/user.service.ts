import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { IUserCheckExist } from 'src/modules/user/interfaces/user.interface';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
	UserCreateDto,
	UserGetDto,
	UserGetListDto,
	UserLoginDto,
	UserRoleUpdateDto,
	UserUpdateDto,
	UserProfileUpdateDto,
} from 'src/modules/user/dtos';
import {
	ENUM_USER_STATUS_CODE_ERROR,
	ENUM_USER_STATUS_CODE_SUCCESS,
} from 'src/modules/user/constants';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants';
import { ENUM_BRANCH_STATUS_CODE_ERROR } from 'src/modules/location/branch.status-code.constant';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';

@Injectable()
export class UserService {
	constructor(
		private readonly authService: AuthService,
		private readonly userRepository: UserRepository,
		private readonly paginationService: PaginationService,
		private readonly databaseTransactionService: DatabaseTransactionService,
		private readonly roleRepository: RoleRepository,
	) {}

	async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
		const role: RoleEntity = await this.roleRepository.findOne({
			where: {
				id: userCreateDto.role,
			},
		});

		if (!role) {
			throw new NotFoundException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
				message: 'role.error.notFound',
			});
		}

		if (role.accessLevel === ENUM_AUTH_ACCESS_LEVEL.PHARMACIST) {
			if (!userCreateDto.branch) {
				throw new BadRequestException({
					statusCode: ENUM_BRANCH_STATUS_CODE_ERROR.BRANCH_ID_REQUIRED_ERROR,
					message: 'branch.error.branchIdRequired',
				});
			}
		} else {
			userCreateDto.branch = null;
		}

		const checkUserExist: IUserCheckExist = await this.checkExist(
			userCreateDto.phoneNumber,
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
				userCreateDto.password,
			);

			await this.userRepository.createOne({
				data: {
					...userCreateDto,
					password: hashedPassword.passwordHash,
				},
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

	async getUsers(userGetListDto: UserGetListDto): Promise<IResponsePaging> {
		const totalData = await this.userRepository.count({});
		const users = await this.userRepository.findMany({
			options: {
				relations: {
					role: true,
					branch: true,
				},
				page: userGetListDto.page,
				limit: userGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			userGetListDto.page,
			userGetListDto.limit,
			null,
			null,
			users,
		);
	}

	async getUserById(userGetDto: UserGetDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				id: userGetDto.userId,
			},
			options: {
				relations: ['role', 'branch'],
			},
		});

		if (!user) {
			throw new NotFoundException({
				statusCode: 404,
				message: 'user.error.notFound',
			});
		}

		return user;
	}

	async login(loginData: UserLoginDto) {
		const user: UserEntity = await this.userRepository.findOne({
			where: {
				phoneNumber: loginData.phoneNumber,
			},
			options: {
				relations: {
					role: {
						permissions: true,
					},
				},
			},
		});

		if (!user) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
				message: 'user.error.notFound',
			});
		}

		const authValidation: boolean = await this.authService.validateUser(
			loginData.password,
			user.password,
		);

		if (!authValidation) {
			throw new BadRequestException({
				statusCode:
					ENUM_USER_STATUS_CODE_ERROR.USER_OR_PASSWORD_NOT_MATCH_ERROR,
				message: 'user.error.userOrPasswordNotMatch',
			});
		} else if (!user.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
				message: 'user.error.inactive',
			});
		}

		const payload: UserPayloadSerialization = await this.payloadSerialization(
			user,
		);
		const tokenType: string = await this.authService.getTokenType();
		const expiresIn: number =
			await this.authService.getAccessTokenExpirationTime();
		const rememberMe = !!loginData.rememberMe;

		const payloadAccessToken: Record<string, any> =
			await this.authService.createPayloadAccessToken(payload, rememberMe);
		const payloadRefreshToken: Record<string, any> =
			await this.authService.createPayloadRefreshToken(payload.id, rememberMe, {
				loginDate: payloadAccessToken.loginDate,
			});

		await this.authService.clearOldAuthTokens(user);
		const [accessToken, refreshToken] = await Promise.all([
			this.authService.createAccessToken(user, payloadAccessToken),
			this.authService.createRefreshToken(user, payloadRefreshToken, {
				rememberMe,
			}),
		]);

		return {
			metadata: {
				statusCode: ENUM_USER_STATUS_CODE_SUCCESS.USER_LOGIN_SUCCESS,
			},
			tokenType,
			expiresIn,
			accessToken,
			refreshToken,
		};
	}

	async refresh(refreshData: Record<string, any>, refreshToken: string) {
		const user: UserEntity = await this.userRepository.findOne({
			where: {
				id: refreshData.id,
			},
			options: {
				relations: {
					role: true,
				},
			},
		});

		if (!user) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
				message: 'user.error.notFound',
			});
		} else if (!user.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
				message: 'user.error.inactive',
			});
		} else if (!user.role.isActive) {
			throw new ForbiddenException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_INACTIVE_ERROR,
				message: 'role.error.inactive',
			});
		}

		const payload: UserPayloadSerialization = await this.payloadSerialization(
			user,
		);
		const tokenType: string = await this.authService.getTokenType();
		const expiresIn: number =
			await this.authService.getAccessTokenExpirationTime();

		const payloadAccessToken: Record<string, any> =
			await this.authService.createPayloadAccessToken(
				payload,
				refreshData.rememberMe,
				{
					loginDate: refreshData.loginDate,
				},
			);

		await this.authService.clearOldAuthTokens(user, true);
		const accessToken: string = await this.authService.createAccessToken(
			refreshData.id,
			payloadAccessToken,
		);

		return {
			tokenType,
			expiresIn,
			accessToken,
			refreshToken,
		};
	}

	async checkExist(phoneNumber: string): Promise<IUserCheckExist> {
		const existUser: UserEntity = await this.userRepository.findOne({
			where: {
				phoneNumber,
			},
		});

		return {
			phoneNumber: !!existUser,
		};
	}

	async payloadSerialization(
		data: UserEntity,
	): Promise<UserPayloadSerialization> {
		return plainToInstance(UserPayloadSerialization, data);
	}

	async updateProfile(id: string, userProfileUpdateDto: UserProfileUpdateDto) {
		return this.userRepository.updateOne({
			criteria: { id },
			data: {
				...userProfileUpdateDto,
			},
		});
	}

	async updateRole(userDto: UserGetDto, roleDto: UserRoleUpdateDto) {
		const expectedRole = await this.roleRepository.findOne({
			where: {
				id: roleDto.roleId,
			},
		});

		if (expectedRole.accessLevel === ENUM_AUTH_ACCESS_LEVEL.PHARMACIST) {
			if (!roleDto.branchId) {
				throw new BadRequestException({
					statusCode: ENUM_BRANCH_STATUS_CODE_ERROR.BRANCH_ID_REQUIRED_ERROR,
					message: 'branch.error.branchIdRequired',
				});
			}
		}

		const updatedUser = await this.userRepository.updateOne({
			criteria: {
				id: userDto.userId,
			},
			data: {
				role: {
					id: roleDto.roleId,
				},
				branch:
					expectedRole.accessLevel === ENUM_AUTH_ACCESS_LEVEL.PHARMACIST
						? {
								id: roleDto.branchId,
						  }
						: null,
			},
		});

		if (!updatedUser) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_CANNOT_UPDATE,
				message: 'user.error.cannotUpdate',
			});
		}

		return {
			id: updatedUser.id,
		};
	}

	async updateUser(user: UserGetDto, userUpdateDto: UserUpdateDto) {
		const expectedRole = await this.roleRepository.findOne({
			where: {
				id: userUpdateDto.role,
			},
		});

		if (expectedRole.accessLevel == ENUM_AUTH_ACCESS_LEVEL.PHARMACIST) {
			if (!userUpdateDto.branch) {
				throw new BadRequestException({
					statusCode: ENUM_BRANCH_STATUS_CODE_ERROR.BRANCH_ID_REQUIRED_ERROR,
					message: 'branch.error.branchIdRequired',
				});
			}
		} else {
			userUpdateDto.branch = null;
		}

		const updatedUser = this.userRepository.updateOne({
			criteria: {
				id: user.userId,
			},
			data: {
				...userUpdateDto,
			},
		});

		if (!updatedUser) {
			throw new NotFoundException({
				statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_CANNOT_UPDATE,
				message: 'user.error.cannotUpdate',
			});
		}

		return updatedUser;
	}
}
