import { BranchGetListDto, BranchParamDto } from 'src/modules/location/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { BranchPublicService } from 'src/modules/location/services';
import { ResponsePaging } from 'src/common/response/decorators/response.decorator';
import { BranchEntity } from 'src/modules/location/entities';

@ApiTags('Public.Branch')
@Controller({
	version: '1',
	path: '/branches',
})
export class BranchPublicController {
	constructor(private readonly branchPublicService: BranchPublicService) {}

	@ResponsePaging('branch.getList')
	@Get('/list')
	async getBranches(
		@Query() branchGetListDto: BranchGetListDto,
	): Promise<IResponsePaging> {
		return this.branchPublicService.getBranches(branchGetListDto);
	}

	@Get('/:branchId')
	async getBranchesById(
		@Param() branchParamDto: BranchParamDto,
	): Promise<BranchEntity> {
		return this.branchPublicService.getBranchesById(branchParamDto);
	}
}
