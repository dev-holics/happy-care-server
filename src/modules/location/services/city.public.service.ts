import { CityEntity } from 'src/modules/location/entities/city.entity';
import { Injectable } from '@nestjs/common';
import { CityPublicRepository } from 'src/modules/location/repositories';

@Injectable()
export class CityPublicService {
	constructor(private readonly cityPublicRepository: CityPublicRepository) {}

	async getCities(): Promise<CityEntity[]> {
		return this.cityPublicRepository.findAll({});
	}
}
