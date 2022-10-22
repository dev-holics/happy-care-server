import { ApiProperty } from '@nestjs/swagger';
import { snakeCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';
import { Exclude, Transform } from 'class-transformer';
import { ENUM_AUTH_ACCESS_LEVEL } from 'src/common/auth/constants';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

export class RoleGetSerialization {
	@ApiProperty({
		example: snakeCase(faker.random.words(3)),
	})
	readonly name: string;

	@ApiProperty({
		example: faker.commerce.productDescription(),
	})
	readonly description: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_AUTH_ACCESS_LEVEL))[0],
	})
	readonly accessLevel: string;

	@ApiProperty({
		description: 'List of permissions of role',
		example: [
			{
				id: faker.database.mongodbObjectId(),
				name: faker.name.jobDescriptor(),
				code: faker.random.alpha(5),
				isActive: true,
			},
		],
		required: true,
	})
	@Transform(({ obj }) =>
		obj.permissions.map((val: PermissionEntity) => ({
			id: `${val.id}`,
			name: val.name,
			code: val.code,
			isActive: val.isActive,
		})),
	)
	readonly permissions: PermissionEntity[];

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
