import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BranchQueryDto {
	@ApiProperty({
		example: 'string',
		required: true,
	})
	@IsString()
	productIds?: string;
}
