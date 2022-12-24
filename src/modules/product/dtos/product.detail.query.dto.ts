import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ProductDetailQueryDto {
	@ApiProperty({
		example: '',
		required: false,
	})
	@IsOptional()
	@IsUUID()
	readonly branchId?: string;
}
