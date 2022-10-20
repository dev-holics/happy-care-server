import { ProductEntity } from 'src/modules/product/entities';

export interface ITagEntity {
	name: string;
	description: string;
	products: ProductEntity[];
}
