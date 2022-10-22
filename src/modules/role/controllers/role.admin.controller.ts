import { RoleAdminService } from 'src/modules/role/services/role.admin.service';
import {
	Response,
	ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { RoleGetListDto } from 'src/modules/role/dtos/role.get-list.dto';
import { RoleGetListSerialization } from 'src/modules/role/serializations/role.get-list.serialization';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { RoleGetDto } from 'src/modules/role/dtos/role.get.dto';
import { RoleUpdateDto } from 'src/modules/role/dtos/role.update.dto';
import {
	RequestBodyDtoGuard,
	RequestParamsDtoGuard,
} from 'src/common/request/decorators/request.decorator';
import { RoleGetSerialization } from 'src/modules/role/serializations/role.get.serialization';

@ApiTags('Admin.Role')
@Controller({
	version: '1',
	path: '/roles',
})
export class RoleAdminController {
	constructor(private readonly roleAdminService: RoleAdminService) {}

	@ResponsePaging('role.getList', {
		classSerialization: RoleGetListSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.READ_ROLE])
	@AuthApiKeyGuard()
	@Get('/list')
	async getList(
		@Query() roleGetListData: RoleGetListDto,
	): Promise<IResponsePaging> {
		return this.roleAdminService.getListRole(roleGetListData);
	}

	@Response('role.getById', {
		classSerialization: RoleGetSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.READ_ROLE])
	@AuthApiKeyGuard()
	@Get('/roleId')
	async getById(@Query() role: RoleGetDto): Promise<IResponse> {
		return this.roleAdminService.getRoleById(role.roleId);
	}

	@Response('role.updateById', {
		classSerialization: ResponseIdSerialization,
	})
	@AuthJwtGuard([PERMISSIONS.UPDATE_ROLE])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(RoleGetDto)
	@RequestBodyDtoGuard(RoleUpdateDto)
	@Put('/:roleId')
	async updateById(
		@Param() role: RoleGetDto,
		@Body() roleUpdateData: RoleUpdateDto,
	): Promise<IResponse> {
		return this.roleAdminService.updateById(role, roleUpdateData);
	}
}
