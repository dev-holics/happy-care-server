import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ITrademarkBody } from 'src/modules/origin/interfaces';

export class TrademarkUpdateBodyDto implements ITrademarkBody {
	@ApiProperty({
		example: '',
		required: true,
	})
	@IsOptional()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		example: '',
		required: true,
	})
	@IsOptional()
	@IsNotEmpty()
	originId: string;
}
