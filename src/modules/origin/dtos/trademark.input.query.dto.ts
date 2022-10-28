import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class TrademarkParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	trademarkId: string;
}
