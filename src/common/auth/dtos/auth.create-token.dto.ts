import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { shuffle } from 'radash';
import { ENUM_AUTH_TOKEN_TYPES } from 'src/common/auth/constants';

export class AuthCreateTokenDto {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@Type(() => String)
	readonly userId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@Type(() => String)
	readonly token: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_AUTH_TOKEN_TYPES))[0],
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	readonly type: string;

	@ApiProperty({
		example: faker.internet.url(),
		required: true,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly origin?: string;

	@ApiProperty({
		example: faker.date.future(),
		required: true,
	})
	@IsDate()
	@IsNotEmpty()
	@MinLength(1)
	@Type(() => Date)
	readonly expiredTime: Date;
}
