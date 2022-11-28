import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRoleUpdateDto {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	roleId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	@IsString()
	branchId: string;
}
