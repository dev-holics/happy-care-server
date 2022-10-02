import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateIf,
} from 'class-validator';
import { IsPasswordStrong } from 'src/common/request/validations/request.is-password-strong.validation';

export class UserLoginDto {
	@ApiProperty({
		example: faker.phone.number('09#########'),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(14)
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
		description: 'if true refresh token expired will extend to 30d, else 7d',
		example: false,
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	@ValidateIf(e => e.rememberMe !== '')
	readonly rememberMe?: boolean;
}
