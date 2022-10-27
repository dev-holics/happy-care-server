import { CityParamDto } from 'src/modules/location/dtos';
import { DistrictEntity } from 'src/modules/location/entities';
import { Injectable } from '@nestjs/common';
import { DistrictPublicRepository } from 'src/modules/location/repositories';

@Injectable()
export class DistrictPublicService {
	constructor(
		private readonly districtPublicRepository: DistrictPublicRepository,
	) {}

	async getDistricts(): Promise<DistrictEntity[]> {
		return this.districtPublicRepository.findAll({});
	}

	async getDistrictsByCityId(
		cityParamDto: CityParamDto,
	): Promise<DistrictEntity[]> {
		return this.districtPublicRepository.findAll({
			where: {
				city: {
					id: cityParamDto.citytId,
				},
			},
		});
	}
}
