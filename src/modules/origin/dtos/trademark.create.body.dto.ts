import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ITrademarkBody } from 'src/modules/origin/interfaces';

export class TrademarkCreateBodyDto implements ITrademarkBody {
	@ApiProperty({
		example: '',
		required: true,
	})
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		example: '',
		required: true,
	})
	@IsNotEmpty()
	originId: string;
}
