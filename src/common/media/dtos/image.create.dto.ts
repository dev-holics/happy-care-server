import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IImageCreate } from 'src/common/media/interfaces';

export class ImageCreateDto implements IImageCreate {
	@ApiProperty({
		example: faker.internet.url(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	url: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	publicId: string;

	@ApiProperty({
		example: faker.internet.domainName,
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	fileName: string;

	@ApiProperty({
		example: 'description',
		required: true,
	})
	@IsString()
	description: string;

	@ApiProperty({
		example: 10,
		required: true,
	})
	@IsNumber()
	@IsNotEmpty()
	width: number;

	@ApiProperty({
		example: 10,
		required: true,
	})
	@IsNumber()
	@IsNotEmpty()
	height: number;
}
