import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ICategoryCreate } from 'src/modules/category/interfaces/category.api.interface';

export class CategoryCreateDto implements ICategoryCreate {
	@ApiProperty({
		example: faker.commerce.product(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(255)
	@Type(() => String)
	readonly name: string;
}
