import { Injectable } from '@nestjs/common';
import { BranchRepository } from 'src/modules/location/repositories';
import {
	BranchCreateInputBodyDto,
	BranchParamDto,
	BranchUpdateInputBodyDto,
} from 'src/modules/location/dtos';

@Injectable()
export class BranchAdminService {
	constructor(private readonly branchRepository: BranchRepository) {}

	async createBranch(branchCreateInputBodyDto: BranchCreateInputBodyDto) {
		return this.branchRepository.createOne({
			data: {
				address: branchCreateInputBodyDto.address,
				district: {
					id: branchCreateInputBodyDto.districtId,
				},
			},
		});
	}

	async updateCart(
		branchParamDto: BranchParamDto,
		branchUpdateInputBodyDto: BranchUpdateInputBodyDto,
	) {
		return this.branchRepository.updateOne({
			criteria: {
				id: branchParamDto.branchId,
			},
			data: {
				address: branchUpdateInputBodyDto.address,
				district: {
					id: branchUpdateInputBodyDto.districtId,
				},
			},
		});
	}

	async deleteSoftBranch(branchParamDto: BranchParamDto) {
		return this.branchRepository.delete({
			id: branchParamDto.branchId,
		});
	}
}
