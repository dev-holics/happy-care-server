import { CityEntity, BranchEntity } from 'src/modules/location/entities';
export interface IDistrictEntity {
	name: string;
	city: CityEntity;
	branches: BranchEntity[];
}
