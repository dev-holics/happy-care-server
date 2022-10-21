import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	Response,
	ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { PermissionAdminService } from 'src/modules/permission/services/permission.admin.service';
import { PermissionCreateDto } from 'src/modules/permission/dtos/permission.create.dto';
import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import {
	RequestBodyDtoGuard,
	RequestParamsDtoGuard,
} from 'src/common/request/decorators/request.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { PermissionGetListSerialization } from 'src/modules/permission/serializations/permission.get-list.serialization';
import { PermissionGetListDto } from 'src/modules/permission/dtos/permission.get-list.dto';
import { PermissionGetDto } from 'src/modules/permission/dtos/permission.get.dto';
import { PermissionGetSerialization } from 'src/modules/permission/serializations/permission.get.serialization';
import { PermissionUpdateDto } from 'src/modules/permission/dtos/permission.update.dto';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';

@ApiTags('Admin.Permission')
@Controller({
	version: '1',
	path: '/permissions',
})
export class PermissionAdminController {
	constructor(
		private readonly permissionAdminService: PermissionAdminService,
	) {}

	@ResponsePaging('permission.getList', {
		classSerialization: PermissionGetListSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.READ_PERMISSION])
	@AuthApiKeyGuard()
	@Get('/list')
	async getAll(
		@Query() permissionGetListData: PermissionGetListDto,
	): Promise<IResponsePaging> {
		return this.permissionAdminService.getListPermission(permissionGetListData);
	}

	@Response('permission.getById', {
		classSerialization: PermissionGetSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.READ_PERMISSION])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(PermissionGetDto)
	@Get('/:permissionId')
	async getById(
		@Param() permissionGetData: PermissionGetDto,
	): Promise<IResponse> {
		return this.permissionAdminService.getPermissionById(permissionGetData);
	}

	@Response('permission.create', {
		doc: { httpStatus: HttpStatus.CREATED },
	})
	@AuthJwtGuard([PERMISSIONS.CREATE_PERMISSION])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(PermissionCreateDto)
	@Post('')
	async createOne(
		@Body() permissionCreateDto: PermissionCreateDto,
	): Promise<IResponse> {
		await this.permissionAdminService.createOnePermission(permissionCreateDto);
		return;
	}

	@Response('permission.updateById', {
		classSerialization: ResponseIdSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.UPDATE_PERMISSION, PERMISSIONS.UPDATE_PERMISSION])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(PermissionGetDto)
	@RequestBodyDtoGuard(PermissionUpdateDto)
	@Put('/:permissionId')
	async updateById(
		@Param() permission: PermissionGetDto,
		@Body() permissionUpdateData: PermissionUpdateDto,
	): Promise<IResponse> {
		return this.permissionAdminService.updatePermissionById(
			permission,
			permissionUpdateData,
		);
	}

	@Response('permission.inactiveById', {
		classSerialization: ResponseIdSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.UPDATE_PERMISSION, PERMISSIONS.UPDATE_PERMISSION])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(PermissionGetDto)
	@Put('/:permissionId/inactive')
	async updateInactiveById(
		@Param() permission: PermissionGetDto,
	): Promise<IResponse> {
		return this.permissionAdminService.updateActiveStatusById(
			permission,
			false,
		);
	}

	@Response('permission.activeById', {
		classSerialization: ResponseIdSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.UPDATE_PERMISSION, PERMISSIONS.UPDATE_PERMISSION])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(PermissionGetDto)
	@Put('/:permissionId/active')
	async updateActiveById(
		@Param() permission: PermissionGetDto,
	): Promise<IResponse> {
		return this.permissionAdminService.updateActiveStatusById(permission, true);
	}
}
