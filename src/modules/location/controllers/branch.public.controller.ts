import {
	BranchGetListDto,
	BranchParamDto,
	BranchQueryDto,
} from 'src/modules/location/dtos';
import {
	IResponseBase,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { BranchPublicService } from 'src/modules/location/services';
import {
	ResponsePagingBase,
	Response,
	ResponseBase,
} from 'src/common/response/decorators/response.decorator';
import { BranchEntity } from 'src/modules/location/entities';

@ApiTags('Public.Branch')
@Controller({
	version: '1',
	path: '/branches',
})
export class BranchPublicController {
	constructor(private readonly branchPublicService: BranchPublicService) {}

	@ResponsePagingBase('branch.getList')
	@Get('/list')
	async getBranches(
		@Query() branchGetListDto: BranchGetListDto,
	): Promise<IResponsePaging> {
		return this.branchPublicService.getBranches(branchGetListDto);
	}

	// @ApiBody({
	// 	type: [CartCreateDto],
	// })
	// @ResponseBase('branch.getBranchesStocking')
	// @Get('statisfied')
	// async getBranchesStocking(
	// 	@Body() cartCreateDto: CartCreateDto[],
	// ): Promise<IResponseBase> {
	// 	return this.branchPublicService.getBranchesStocking(cartCreateDto);
	// }

	@ResponseBase('branch.getBranchesStocking')
	@Get('statisfied')
	async getBranchesStatisfied(
		@Query() branchQueryDto: BranchQueryDto,
	): Promise<IResponseBase> {
		return this.branchPublicService.getBranchesStatisfied(branchQueryDto);
	}

	@Response('branch.getBranch')
	@Get('/:branchId')
	async getBranchesById(
		@Param() branchParamDto: BranchParamDto,
	): Promise<BranchEntity> {
		return this.branchPublicService.getBranchesById(branchParamDto);
	}
}
