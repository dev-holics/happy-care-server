import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ImageSerialization {
	@ApiProperty({
		example: faker.system.directoryPath(),
	})
	@Type(() => String)
	url: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
	})
	@Type(() => String)
	publicId: string;

	@ApiProperty({
		example: faker.system.fileName(),
	})
	@Type(() => String)
	filename: string;

	@ApiProperty({
		example: faker.lorem.paragraph(),
	})
	@Type(() => String)
	description: string;

	@ApiProperty({
		example: faker.datatype.number(),
	})
	@Type(() => Number)
	width: number;

	@ApiProperty({
		example: faker.datatype.number(),
	})
	@Type(() => Number)
	height: number;
}
