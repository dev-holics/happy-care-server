import { ProductEntity } from 'src/modules/product/entities/product.entity';

export interface IOrderDetailEntity {
	quantity: number;
	product: ProductEntity;
}
