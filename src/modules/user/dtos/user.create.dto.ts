import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	MinLength,
	IsOptional,
} from 'class-validator';
import { IsPasswordStrong } from 'src/common/request/validations/request.is-password-strong.validation';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { IUserCreate } from 'src/modules/user/interfaces/user.api.interface';

export class UserCreateDto implements IUserCreate {
	@ApiProperty({
		example: faker.phone.number('09#########'),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(14)
	@Type(() => String)
	readonly phoneNumber: string;

	@ApiProperty({
		description: 'string password',
		example: `${faker.random.alphaNumeric(5).toLowerCase()}${faker.random
			.alphaNumeric(5)
			.toUpperCase()}@@!123`,
		required: true,
	})
	@IsNotEmpty()
	@IsPasswordStrong()
	readonly password: string;

	@ApiProperty({
		example: faker.name.fullName(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(30)
	@Type(() => String)
	readonly fullname: string;

	@ApiProperty({
		example: faker.internet.email(),
		required: false,
	})
	@IsString()
	@IsOptional()
	@MaxLength(100)
	@Type(() => String)
	readonly email?: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_GENDERS))[0],
		required: false,
		enum: ENUM_GENDERS,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly gender?: string;
}
