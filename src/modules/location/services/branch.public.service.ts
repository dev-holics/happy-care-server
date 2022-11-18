import { BranchEntity } from 'src/modules/location/entities/branch.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { BranchGetListDto, BranchParamDto } from 'src/modules/location/dtos';
import {
	IResponseBase,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { BranchPublicRepository } from 'src/modules/location/repositories';
import { ILike, In } from 'typeorm';
import { CartCreateDto } from 'src/modules/cart/dtos';

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

	async getBranchesStocking(
		cartCreateDto: CartCreateDto[],
	): Promise<IResponseBase> {
		cartCreateDto.sort((a: any, b: any) => {
			return a.productId - b.productId;
		});
		const ids = [];
		cartCreateDto.forEach(item => {
			ids.push(item.productId);
		});
		const size = ids.length;
		const branchList = await this.branchPublicRepository.findAll({
			where: {
				productDetails: {
					product: {
						id: In(ids),
					},
				},
			},
			options: {
				relations: [
					'productDetails',
					'productDetails.product',
					'district',
					'district.city',
				],
				order: {
					id: 'ASC',
					productDetails: {
						product: {
							id: 'ASC',
						},
					},
				},
			},
		});
		const result = [];
		for (let i = 0; i < branchList.length; i++) {
			if (branchList[i].productDetails.length !== size) continue;
			let check = false;
			for (let j = 0; j < cartCreateDto.length; j++) {
				if (
					branchList[i].productDetails[j].quantity < cartCreateDto[j].quantity
				) {
					check = true;
					break;
				}
			}
			if (!check) {
				delete branchList[i].productDetails;
				result.push(branchList[i]);
			}
		}
		return this.paginationService.formatResult(result);
	}
}
