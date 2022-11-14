import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { shuffle } from 'radash';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { IUserUpdate } from 'src/modules/user/interfaces/user.update.interface';

export class UserUpdateDto implements IUserUpdate {
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

	@ApiProperty({
		example: faker.date.between('1987-1-1', '2022-10-14'),
	})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	birthday: Date;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	readonly role: RoleEntity;
}
