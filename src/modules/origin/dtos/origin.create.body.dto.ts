import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IOriginBody } from 'src/modules/origin/interfaces';

export class OriginCreateBodyDto implements IOriginBody {
	@ApiProperty({
		example: '',
		required: true,
	})
	@IsNotEmpty()
	name: string;
}
