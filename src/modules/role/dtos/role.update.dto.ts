import { ApiProperty } from '@nestjs/swagger';
import { snakeCase } from 'change-case';
import { faker } from '@faker-js/faker';
import {
	ArrayNotEmpty,
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RoleUpdateDto {
	@ApiProperty({
		example: snakeCase(faker.random.words(3)),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	@Type(() => String)
	readonly name: string;

	@ApiProperty({
		example: faker.commerce.productDescription(),
		required: true,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly description?: string;

	@ApiProperty({
		description: 'List of permission',
		example: [faker.datatype.uuid(), faker.datatype.uuid()],
		required: true,
	})
	@IsUUID('all', { each: true })
	@ArrayNotEmpty()
	@IsArray()
	@IsNotEmpty()
	readonly permissions: string[];
}
