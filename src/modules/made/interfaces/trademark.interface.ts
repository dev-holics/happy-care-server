import { ProductEntity } from 'src/modules/product/entities';
import { OriginEntity } from 'src/modules/made/entities';

export interface ITrademarkInterface {
	name: string;

	origin: OriginEntity;

	products: ProductEntity[];
}
