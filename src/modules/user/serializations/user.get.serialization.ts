import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { shuffle } from 'radash';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { Exclude } from 'class-transformer';

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

	@ApiProperty({
		allOf: [{ $ref: getSchemaPath(AwsS3Serialization) }],
	})
	readonly photo?: AwsS3Serialization;

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
	readonly updatedAt: Date;
}
