import {
	BranchRepository,
	CityPublicRepository,
	DistrictPublicRepository,
	BranchPublicRepository,
} from 'src/modules/location/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity, DistrictEntity } from './entities';
import {
	BranchPublicService,
	BranchAdminService,
	DistrictPublicService,
	CityPublicService,
} from 'src/modules/location/services';
import { CityEntity } from 'src/modules/location/entities/city.entity';

@Module({
	controllers: [],
	providers: [
		CityPublicRepository,
		DistrictPublicRepository,
		BranchRepository,
		BranchPublicRepository,
		BranchPublicService,
		BranchAdminService,
		DistrictPublicService,
		CityPublicService,
	],
	exports: [
		CityPublicRepository,
		DistrictPublicRepository,
		BranchRepository,
		BranchPublicRepository,
		BranchPublicService,
		BranchAdminService,
		DistrictPublicService,
		CityPublicService,
	],
	imports: [
		TypeOrmModule.forFeature([CityEntity, DistrictEntity, BranchEntity]),
	],
})
export class LocationModule {}
