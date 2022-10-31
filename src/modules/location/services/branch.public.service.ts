import { BranchEntity } from 'src/modules/location/entities/branch.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { BranchGetListDto, BranchParamDto } from 'src/modules/location/dtos';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { BranchPublicRepository } from 'src/modules/location/repositories';
import { ILike } from 'typeorm';

@Injectable()
export class BranchPublicService {
	constructor(
		private readonly branchPublicRepository: BranchPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getBranches(
		branchGetListDto: BranchGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.branchPublicRepository.count({});
		const search = branchGetListDto.searchData
			? branchGetListDto.searchData.trim()
			: null;
		const branches = await this.branchPublicRepository.findMany({
			where: {
				district: {
					id: branchGetListDto.districtId
						? branchGetListDto.districtId
						: undefined,

					city: {
						id: branchGetListDto.cityId ? branchGetListDto.cityId : undefined,
					},
				},
				address: search ? ILike(`%${search}%`) : undefined,
			},
			options: {
				relations: ['district', 'district.city'],
				page: branchGetListDto.page,
				limit: branchGetListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
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
			options: {
				relations: ['district', 'district.city'],
			},
		});
	}
}
