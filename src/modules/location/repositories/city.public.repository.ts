import { CityEntity } from 'src/modules/location/entities/city.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class CityPublicRepository extends DatabaseRepositoryAbstract<CityEntity> {
	constructor(
		@InjectRepository(CityEntity)
		private cityPublicRepository: Repository<CityEntity>,
	) {
		super(cityPublicRepository);
	}
}
