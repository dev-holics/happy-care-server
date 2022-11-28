import { ProductEntity } from 'src/modules/product/entities';
import { OriginEntity } from 'src/modules/origin/entities';

export interface ITrademarkInterface {
	name: string;

	origin: OriginEntity;

	products: ProductEntity[];
}
