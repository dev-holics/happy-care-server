import {
	ProductConsignmentEntity,
	ProductEntity,
} from 'src/modules/product/entities';
import { BranchEntity } from 'src/modules/location/entities';

export interface IProductDetailEntity {
	productConsignments: ProductConsignmentEntity[];
	product: ProductEntity;
	branch: BranchEntity;
}
