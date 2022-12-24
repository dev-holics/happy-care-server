import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductParamDto {
	@ApiProperty({
		example: '',
		required: true,
	})
	@IsNotEmpty()
	@IsUUID()
	@IsString()
	productId: string;
}
