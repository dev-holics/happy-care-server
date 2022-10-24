import { ImageCreateDto } from 'src/common/media/dtos';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	MinLength,
	IsOptional,
	IsArray,
} from 'class-validator';
import { ICategoryCreate } from 'src/modules/category/interfaces/category.api.interface';

export class CategoryCreateDto implements ICategoryCreate {
	@ApiProperty({
		example: faker.commerce.productName(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(255)
	@Type(() => String)
	readonly name: string;

	@ApiProperty({
		example: faker.commerce.productDescription(),
		required: false,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly description?: string;

	@ApiProperty({
		example: faker.random.numeric(1),
		required: true,
	})
	@IsNotEmpty()
	@Type(() => Number)
	readonly order: number;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly parentId: string;

	@ApiProperty({
		isArray: true,
		type: ImageCreateDto,
		required: false,
	})
	@IsArray()
	@Type(() => ImageCreateDto)
	images: ImageCreateDto[];
}
