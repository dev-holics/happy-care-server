import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ResponseIdSerialization {
	@ApiProperty({
		description: 'Id that representative with your target data',
		example: '2d6ea442-e932-400a-b459-5570df881399',
		required: true,
	})
	@Type(() => String)
	id: string;
}
