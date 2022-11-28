import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';
import { RoleGetListDto } from 'src/modules/role/dtos/role.get-list.dto';
import { In } from 'typeorm';
import { isEmpty } from 'radash';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RoleGetDto } from 'src/modules/role/dtos/role.get.dto';
import { RoleUpdateDto } from 'src/modules/role/dtos/role.update.dto';
import { PermissionRepository } from 'src/modules/permission/repositories/permission.repository';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants';
import { RedisService } from 'src/common/redis/services/redis.service';

@Injectable()
export class RoleAdminService {
	constructor(
		private readonly roleRepository: RoleRepository,
		private readonly permissionRepository: PermissionRepository,
		private readonly paginationService: PaginationService,
		private readonly redisService: RedisService,
	) {}

	async getListRole(roleGetListData: RoleGetListDto) {
		let whereOptions: Record<string, any> | Record<string, any>[];

		if (!isEmpty(roleGetListData.search)) {
			whereOptions = roleGetListData.search;
		} else {
			whereOptions = {
				accessLevel: roleGetListData.accessLevel,
				isActive: roleGetListData.isActive,
			};
		}

		const roles = await this.roleRepository.findMany({
			where: whereOptions,
			options: {
				page: roleGetListData.page,
				limit: roleGetListData.limit,
				order: {
					...roleGetListData.sort,
				},
				relations: {
					permissions: true,
				},
			},
		});
		const totalData = await this.roleRepository.count({});
		return this.paginationService.formatPaginationResult(
			totalData,
			roleGetListData.page,
			roleGetListData.limit,
			roleGetListData.availableSearch,
			roleGetListData.availableSort,
			roles,
		);
	}

	async getRoleById(roleId: string) {
		let role;
		const roles = await this.redisService.appRole().get();

		if (roles) {
			role = roles.find(r => r.id === roleId);
		} else {
			role = await this.roleRepository.findOne({
				where: {
					id: roleId,
				},
				options: {
					relations: {
						permissions: true,
					},
				},
			});

			const allRoles = await this.roleRepository.findAll({
				options: {
					relations: {
						permissions: true,
					},
				},
			});
			await this.redisService.appRole().set(allRoles);
		}

		if (!role) {
			throw new NotFoundException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
				message: 'role.error.notFound',
			});
		}

		return role;
	}

	async updateById(role: RoleGetDto, roleUpdateData: RoleUpdateDto) {
		const permissions = await this.permissionRepository.findAll({
			where: {
				id: In(roleUpdateData.permissions),
			},
		});

		const updatedRole = await this.roleRepository.updateOne({
			criteria: {
				id: role.roleId,
			},
			data: {
				permissions,
				name: roleUpdateData.name,
				description: roleUpdateData.description,
			},
		});

		if (!updatedRole) {
			throw new BadRequestException({
				statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_CANNOT_UPDATE,
				message: 'role.error.cannotUpdate',
			});
		}
		await this.redisService.appRole().delete();
		return {
			id: updatedRole.id,
		};
	}
}
