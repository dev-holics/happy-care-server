import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import {
	ProductDetailEntity,
	ProductLogEntity,
} from 'src/modules/product/entities';

export interface IBranchEntity {
	address: string;
	district: DistrictEntity;
	productDetails: ProductDetailEntity[];
	productLogs: ProductLogEntity[];
}
