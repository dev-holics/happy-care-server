import { DistrictEntity } from 'src/modules/location/entities/district.entity';

export interface ICityEntity {
	name: string;
	districts: DistrictEntity[];
}
