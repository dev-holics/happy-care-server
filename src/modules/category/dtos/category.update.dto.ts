import { ImageUpdateDto } from 'src/common/media/dtos';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsString,
	IsNotEmpty,
	IsArray,
	IsOptional,
} from 'class-validator';
import { ICategoryUpdate } from 'src/modules/category/interfaces';
import { Type } from 'class-transformer';

export class CategoryUpdateDto implements ICategoryUpdate {
	@ApiProperty({
		example: faker.commerce.productName(),
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({
		example: faker.commerce.productDescription(),
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({
		example: faker.random.numeric(1),
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsNumber()
	order: number;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	parentId: string;

	@ApiProperty({
		isArray: true,
		type: ImageUpdateDto,
		required: false,
	})
	@IsOptional()
	@IsArray()
	@Type(() => ImageUpdateDto)
	images: ImageUpdateDto[];
}
