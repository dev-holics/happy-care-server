import { CityParamDto } from 'src/modules/location/dtos/city.input.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import {
	CityPublicService,
	DistrictPublicService,
} from 'src/modules/location/services';
import { CityEntity, DistrictEntity } from 'src/modules/location/entities';
import { Response } from 'src/common/response/decorators/response.decorator';

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

	@Response('city.getAll', {})
	@Get('')
	async getCities(): Promise<CityEntity[]> {
		return this.cityPublicService.getCities();
	}

	@Response('district.getDistrictByCityId', {})
	@Get('/:cityId/district')
	async getDistrictsByCityId(
		@Param() cityParamDto: CityParamDto,
	): Promise<DistrictEntity[]> {
		return this.districtPublicService.getDistrictsByCityId(cityParamDto);
	}
}
