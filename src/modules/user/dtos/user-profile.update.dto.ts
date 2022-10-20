import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsEnum,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { shuffle } from 'radash';
import { ENUM_GENDERS } from 'src/modules/user/constants';

export class UserProfileUpdateDto {
	@ApiProperty({
		example: faker.name.fullName(),
		required: true,
	})
	@MinLength(1)
	@MaxLength(30)
	@IsOptional()
	@IsString()
	fullname: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_GENDERS))[0],
		required: false,
		enum: ENUM_GENDERS,
	})
	@IsEnum(ENUM_GENDERS)
	@IsOptional()
	gender: ENUM_GENDERS;

	@ApiProperty({
		example: faker.date.between('1987-1-1', '2022-10-14'),
	})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	birthday: Date;
}
