import { BranchEntity } from 'src/modules/location/entities';
import { ProductEntity } from 'src/modules/product/entities';

export interface IProductLogEntity {
	quantity: number;
	transactionDate: Date;
	types: string;
	branch: BranchEntity;
	product: ProductEntity;
}
