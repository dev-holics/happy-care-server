import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class UserSettingCreateDto {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	districtId: string;

	@ApiProperty({
		example: '29 Phước Mỹ 1',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	address: string;

	@ApiProperty({
		example: '0905421172',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsMobilePhone()
	phoneNumber: string;
}
