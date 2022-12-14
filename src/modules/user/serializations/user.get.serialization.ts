import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { Exclude, Transform } from 'class-transformer';
import { IRoleEntity } from 'src/modules/role/interfaces/role.entity.interface';
import { ImageSerialization } from 'src/common/media/serializations/image.serialization';

export class UserGetSerialization {
	@ApiProperty({
		example: faker.datatype.uuid(),
	})
	readonly id: string;

	@ApiProperty({
		example: faker.phone.number('09#########'),
		required: true,
	})
	readonly phoneNumber: string;

	@ApiProperty({
		example: faker.name.fullName(),
		required: true,
	})
	readonly fullname: string;

	@ApiProperty({
		example: faker.internet.email(),
		required: false,
	})
	readonly email: string;

	@ApiProperty({
		example: shuffle(Object.values(ENUM_GENDERS))[0],
		required: false,
		enum: ENUM_GENDERS,
	})
	readonly gender: string;

	@Transform(({ value }) => ({
		name: value.name,
		permissions: value.permissions.map((val: Record<string, any>) => ({
			name: val.name,
			isActive: val.isActive,
			code: val.code,
		})),
		accessLevel: value.accessLevel,
		isActive: value.isActive,
	}))
	readonly role: IRoleEntity;

	@ApiProperty({
		allOf: [{ $ref: getSchemaPath(ImageSerialization) }],
	})
	readonly photo?: ImageSerialization;

	@ApiProperty({
		example: true,
	})
	readonly isActive: boolean;

	@ApiProperty({
		example: faker.date.past(),
	})
	readonly createdAt: Date;

	@Exclude()
	readonly password: string;

	@Exclude()
	readonly deletedAt: Date;

	@Exclude()
	readonly updatedAt: Date;
}
