import { ProductDetailEntity } from 'src/modules/product/entities';

export interface IProductConsignment {
	quantity: number;
	expired: Date;
	productDetail: ProductDetailEntity;
}
