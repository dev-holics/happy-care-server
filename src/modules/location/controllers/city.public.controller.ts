import { CityParamDto } from 'src/modules/location/dtos/city.input.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import {
	CityPublicService,
	DistrictPublicService,
} from 'src/modules/location/services';
import { CityEntity, DistrictEntity } from 'src/modules/location/entities';

@ApiTags('Public.City')
@Controller({
	version: '1',
	path: '/cities',
})
export class CityPublicController {
	constructor(
		private readonly cityPublicService: CityPublicService,
		private readonly districtPublicService: DistrictPublicService,
	) {}

	@Get('')
	async getCities(): Promise<CityEntity[]> {
		return this.cityPublicService.getCities();
	}

	@Get('/:cityId/district')
	async getDistrictsByCityId(
		@Param() cityParamDto: CityParamDto,
	): Promise<DistrictEntity[]> {
		return this.districtPublicService.getDistrictsByCityId(cityParamDto);
	}
}
