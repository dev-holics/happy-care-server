import { ProductEntity } from 'src/modules/product/entities';
import { TrademarkEntity } from 'src/modules/made/entities';

export interface IOriginInterface {
	name: string;

	trademarks: TrademarkEntity[];

	products: ProductEntity[];
}
