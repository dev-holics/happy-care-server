import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class DistrictPublicRepository extends DatabaseRepositoryAbstract<DistrictEntity> {
	constructor(
		@InjectRepository(DistrictEntity)
		private districtPublicRepository: Repository<DistrictEntity>,
	) {
		super(districtPublicRepository);
	}
}
