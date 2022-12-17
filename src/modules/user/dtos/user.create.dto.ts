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
	IsDate,
} from 'class-validator';
import { IsPasswordStrong } from 'src/common/request/validations/request.is-password-strong.validation';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { IUserCreate } from 'src/modules/user/interfaces/user.api.interface';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { BranchEntity } from 'src/modules/location/entities';

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
	// @IsPasswordStrong()
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

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	branch: BranchEntity;
}
