import { BranchEntity } from 'src/modules/location/entities/branch.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { BranchGetListDto, BranchParamDto } from 'src/modules/location/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { BranchPublicRepository } from 'src/modules/location/repositories';

@Injectable()
export class BranchPublicService {
	constructor(
		private readonly branchPublicRepository: BranchPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getBranches(
		branchGetListDto: BranchGetListDto,
	): Promise<IResponsePaging> {
		const branches = await this.branchPublicRepository.findMany({
			where: {
				district: {
					id: branchGetListDto.districtId,
					city: {
						id: branchGetListDto.cityId,
					},
				},
			},
			options: {
				page: branchGetListDto.page,
				limit: branchGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			branchGetListDto.page,
			branchGetListDto.limit,
			null,
			null,
			branches,
		);
	}

	async getBranchesById(branchParamDto: BranchParamDto): Promise<BranchEntity> {
		return this.branchPublicRepository.findOne({
			where: {
				id: branchParamDto.branchId,
			},
		});
	}
}
