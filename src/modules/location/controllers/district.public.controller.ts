import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { DistrictPublicService } from 'src/modules/location/services';
import { DistrictEntity } from 'src/modules/location/entities';
import { Response } from 'src/common/response/decorators/response.decorator';

@ApiTags('Public.District')
@Controller({
	version: '1',
	path: '/districts',
})
export class DistrictPublicController {
	constructor(private readonly districtPublicService: DistrictPublicService) {}

	@Response('district.getAll', {})
	@Get('')
	async getDistricts(): Promise<DistrictEntity[]> {
		return this.districtPublicService.getDistricts();
	}
}
