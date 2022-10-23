import { snakeCase } from 'change-case';
import { shuffle } from 'radash';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ENUM_PERMISSION_MODULE } from 'src/modules/permission/constants';
import { IPermissionCreate } from 'src/modules/permission/interfaces/permission.api.interface';

export class PermissionCreateDto implements IPermissionCreate {
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
		example: shuffle(Object.values(ENUM_PERMISSION_MODULE))[0],
		required: true,
		enum: ENUM_PERMISSION_MODULE,
	})
	@IsString()
	@IsEnum(ENUM_PERMISSION_MODULE)
	@Type(() => String)
	readonly module: string;

	@ApiProperty({
		example: faker.commerce.productDescription(),
		required: true,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly description?: string;
}
