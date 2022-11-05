import { ProductEntity } from 'src/modules/product/entities';
import { BranchEntity } from 'src/modules/location/entities';

export interface IProductDetailEntity {
	quantity: number;
	product: ProductEntity;
	branch: BranchEntity;
}
