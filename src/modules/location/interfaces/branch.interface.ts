import { DistrictEntity } from 'src/modules/location/entities/district.entity';

export interface IBranchEntity {
	address: string;
	district: DistrictEntity;
}
