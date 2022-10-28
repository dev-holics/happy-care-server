import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IOriginBody } from 'src/modules/origin/interfaces';

export class OriginUpdateBodyDto implements IOriginBody {
	@ApiProperty({
		example: '',
		required: true,
	})
	@IsOptional()
	@IsNotEmpty()
	name: string;
}
