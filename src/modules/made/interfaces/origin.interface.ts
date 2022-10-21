import { TrademarkEntity } from 'src/modules/made/entities';

export interface IOriginInterface {
	name: string;

	trademarks: TrademarkEntity[];
}
