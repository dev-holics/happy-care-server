import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { DistrictPublicService } from 'src/modules/location/services';
import { ResponseBase } from 'src/common/response/decorators/response.decorator';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';

@ApiTags('Public.District')
@Controller({
	version: '1',
	path: '/districts',
})
export class DistrictPublicController {
	constructor(private readonly districtPublicService: DistrictPublicService) {}

	@ResponseBase('district.getAll')
	@Get('')
	async getDistricts(): Promise<IResponseBase> {
		return this.districtPublicService.getDistricts();
	}
}
