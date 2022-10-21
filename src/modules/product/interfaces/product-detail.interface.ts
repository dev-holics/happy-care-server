import { ProductEntity } from 'src/modules/product/entities';
import { BranchEntity } from 'src/modules/location/entities';

export interface IProductDetailEntity {
	isAllowSell: boolean;
	quantity: number;
	packingSpec: string;
	unit: string;
	expiredDate: Date;
	product: ProductEntity;
	branch: BranchEntity;
}
