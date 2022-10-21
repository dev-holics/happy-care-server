import { ApiProperty } from '@nestjs/swagger';
import { snakeCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';
import { ENUM_PERMISSION_MODULE } from 'src/modules/permission/constants';
import { Exclude } from 'class-transformer';

export class PermissionGetSerialization {
	@ApiProperty({
		example: snakeCase(faker.random.words(3)),
	})
	readonly name: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_PERMISSION_MODULE))[0],
	})
	readonly module: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_PERMISSION_MODULE))[0],
	})
	readonly description: string;

	@ApiProperty({
		example: true,
	})
	readonly isActive: boolean;

	@Exclude()
	readonly createdAt: Date;

	@Exclude()
	readonly deletedAt: Date;

	@Exclude()
	readonly updatedAt: Date;
}
