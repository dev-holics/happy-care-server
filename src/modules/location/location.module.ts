import { CityEntity } from 'src/modules/location/entities/city.entity';
import {
	BranchRepository,
	CityRepository,
	DistrictRepository,
} from 'src/modules/location/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity, DistrictEntity } from './entities';

@Module({
	controllers: [],
	providers: [CityRepository, DistrictRepository, BranchRepository],
	exports: [CityRepository, DistrictRepository, BranchRepository],
	imports: [
		TypeOrmModule.forFeature([CityEntity, DistrictEntity, BranchEntity]),
	],
})
export class LocationModule {}
