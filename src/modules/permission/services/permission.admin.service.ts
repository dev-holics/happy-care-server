import { isEmpty } from 'radash';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { PermissionCreateDto } from 'src/modules/permission/dtos/permission.create.dto';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { ENUM_PERMISSION_STATUS_CODE_ERROR } from 'src/modules/permission/constants';
import { PermissionGetListDto } from 'src/modules/permission/dtos/permission.get-list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { PermissionGetDto } from 'src/modules/permission/dtos/permission.get.dto';
import { PermissionUpdateDto } from 'src/modules/permission/dtos/permission.update.dto';
import { RedisService } from 'src/common/redis/services/redis.service';

@Injectable()
export class PermissionAdminService {
	constructor(
		private readonly authService: AuthService,
		private readonly permissionRepository: PermissionRepository,
		private readonly paginationService: PaginationService,
		private readonly redisService: RedisService,
	) {}

	async getListPermission(permissionGetListData: PermissionGetListDto) {
		let whereOptions: Record<string, any> | Record<string, any>[];

		if (!isEmpty(permissionGetListData.search)) {
			whereOptions = permissionGetListData.search;
		} else {
			whereOptions = {
				code: permissionGetListData.code,
				module: permissionGetListData.module,
				isActive: permissionGetListData.isActive,
			};
		}

		const permissions = await this.permissionRepository.findMany({
			where: whereOptions,
			options: {
				page: permissionGetListData.page,
				limit: permissionGetListData.limit,
				order: {
					...permissionGetListData.sort,
				},
			},
		});

		return this.paginationService.formatPaginationResult(
			permissionGetListData.page,
			permissionGetListData.limit,
			permissionGetListData.availableSearch,
			permissionGetListData.availableSort,
			permissions,
		);
	}

	async getPermissionById(permissionGetData: PermissionGetDto) {
		let permission;
		const permissions = await this.redisService.appPermission().get();

		if (permissions) {
			permission = permissions.find(
				p => p.id === permissionGetData.permissionId,
			);
		} else {
			permission = await this.permissionRepository.findOne({
				where: {
					id: permissionGetData.permissionId,
				},
			});

			const allPermissions = await this.permissionRepository.findAll({});
			await this.redisService.appPermission().set(allPermissions);
		}

		if (!permission) {
			throw new NotFoundException({
				statusCode: ENUM_PERMISSION_STATUS_CODE_ERROR.PERMISSION_NOT_FOUND,
				message: 'permission.error.notFound',
			});
		}

		return permission;
	}

	async createOnePermission(permissionData: PermissionCreateDto) {
		const permissionWithLargestCode = await this.permissionRepository.findOne({
			options: {
				order: {
					code: 'DESC',
				},
			},
		});

		if (!permissionWithLargestCode) {
			throw new InternalServerErrorException({
				statusCode: ENUM_PERMISSION_STATUS_CODE_ERROR.PERMISSION_CANNOT_CREATE,
				message: 'permission.error.cannotCreate',
			});
		}

		return Promise.all([
			this.permissionRepository.createOne({
				data: {
					...permissionData,
					code: permissionWithLargestCode.code + 10,
				},
			}),
			this.redisService.appPermission().delete(),
		]);
	}

	async updatePermissionById(
		permission: PermissionGetDto,
		permissionUpdateData: PermissionUpdateDto,
	) {
		const updatedPermission = await this.permissionRepository.updateOne({
			criteria: {
				id: permission.permissionId,
			},
			data: {
				name: permissionUpdateData.name,
				description: permissionUpdateData.description,
			},
		});

		if (!updatedPermission) {
			throw new BadRequestException({
				statusCode: ENUM_PERMISSION_STATUS_CODE_ERROR.PERMISSION_CANNOT_UPDATE,
				message: 'permission.error.cannotUpdate',
			});
		}

		await this.redisService.appPermission().delete();

		return {
			id: updatedPermission.id,
		};
	}

	async updateActiveStatusById(
		permission: PermissionGetDto,
		isActive: boolean,
	) {
		const updatedPermission = await this.permissionRepository.updateOne({
			criteria: {
				id: permission.permissionId,
				isActive: !isActive,
			},
			data: {
				isActive,
			},
		});

		await this.redisService.appPermission().delete();

		return {
			id: updatedPermission.id,
		};
	}
}
