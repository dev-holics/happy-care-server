import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { PERMISSIONS } from 'src/common/auth/constants/auth.permission.constant';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import { BranchAdminService } from 'src/modules/location/services';
import { Response } from 'src/common/response/decorators/response.decorator';
import {
	BranchParamDto,
	BranchCreateInputBodyDto,
	BranchUpdateInputBodyDto,
} from 'src/modules/location/dtos';

@ApiTags('Admin.Branch')
@Controller({
	version: '1',
	path: '/branches',
})
export class BranchAdminController {
	constructor(private readonly branchAdminService: BranchAdminService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_BRANCH])
	@AuthApiKeyGuard()
	@Post('')
	async createBranch(
		@Body() branchCreateInputBodyDto: BranchCreateInputBodyDto,
	) {
		return this.branchAdminService.createBranch(branchCreateInputBodyDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_BRANCH])
	@AuthApiKeyGuard()
	@Put('/:branchId')
	async updateBranch(
		@Param() branchParamDto: BranchParamDto,
		@Body() branchUpdateInputBodyDto: BranchUpdateInputBodyDto,
	) {
		return this.branchAdminService.updateCart(
			branchParamDto,
			branchUpdateInputBodyDto,
		);
	}

	@Response('deleted soft successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.DELETE_BRANCH])
	@AuthApiKeyGuard()
	@Delete('/:branchId')
	async deleteSoftBranch(@Param() branchParamDto: BranchParamDto) {
		return this.branchAdminService.deleteSoftBranch(branchParamDto);
	}
}
