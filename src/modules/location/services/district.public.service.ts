import { CityParamDto } from 'src/modules/location/dtos';
import { Injectable } from '@nestjs/common';
import { DistrictPublicRepository } from 'src/modules/location/repositories';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class DistrictPublicService {
	constructor(
		private readonly districtPublicRepository: DistrictPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getDistricts(): Promise<IResponseBase> {
		const result = await this.districtPublicRepository.findAll({
			options: {
				relations: {
					city: true,
				},
			},
		});
		return this.paginationService.formatResult(result);
	}

	async getDistrictsByCityId(
		cityParamDto: CityParamDto,
	): Promise<IResponseBase> {
		const result = await this.districtPublicRepository.findAll({
			where: {
				city: {
					id: cityParamDto.cityId,
				},
			},
		});
		return this.paginationService.formatResult(result);
	}
}
