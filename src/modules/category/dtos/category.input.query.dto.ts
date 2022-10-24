import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';

export class CategoryInputQueryDto {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsString()
	@IsOptional()
	readonly parentId: string;
}
