import { TrademarkEntity } from 'src/modules/origin/entities';

export interface IOriginInterface {
	name: string;

	trademarks: TrademarkEntity[];
}
