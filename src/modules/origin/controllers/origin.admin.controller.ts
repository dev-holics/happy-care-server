import { OriginAdminService } from 'src/modules/origin/services';
import { Body, Controller, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { Response } from 'src/common/response/decorators/response.decorator';
import {
	OriginCreateBodyDto,
	OriginParamDto,
	OriginUpdateBodyDto,
} from 'src/modules/origin/dtos';

@ApiTags('Admin.Origin')
@Controller({
	version: '1',
	path: '/origins',
})
export class OriginAdminController {
	constructor(private readonly originAdminService: OriginAdminService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_ORIGIN])
	@AuthApiKeyGuard()
	@Post()
	async createOrigin(@Body() originCreateBodyDto: OriginCreateBodyDto) {
		return this.originAdminService.createOrigin(originCreateBodyDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_ORIGIN])
	@AuthApiKeyGuard()
	@Put('/:originId')
	async updateOrigin(
		@Param() originParamDto: OriginParamDto,
		@Body() originUpdateBodyDto: OriginUpdateBodyDto,
	) {
		return this.updateOrigin(originParamDto, originUpdateBodyDto);
	}
}
