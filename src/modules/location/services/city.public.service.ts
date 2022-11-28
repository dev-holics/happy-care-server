import { Injectable } from '@nestjs/common';
import { CityPublicRepository } from 'src/modules/location/repositories';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class CityPublicService {
	constructor(
		private readonly cityPublicRepository: CityPublicRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getCities(): Promise<IResponseBase> {
		const result = await this.cityPublicRepository.findAll({});
		return this.paginationService.formatResult(result);
	}
}
