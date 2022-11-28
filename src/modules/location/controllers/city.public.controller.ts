import { CityParamDto } from 'src/modules/location/dtos/city.input.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import {
	CityPublicService,
	DistrictPublicService,
} from 'src/modules/location/services';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';

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

	@ResponseBase('city.getAll')
	@Get('')
	async getCities(): Promise<IResponseBase> {
		return this.cityPublicService.getCities();
	}

	@ResponseBase('district.getDistrictByCityId')
	@Get('/:cityId/district')
	async getDistrictsByCityId(
		@Param() cityParamDto: CityParamDto,
	): Promise<IResponseBase> {
		return this.districtPublicService.getDistrictsByCityId(cityParamDto);
	}
}
