import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IImageCreate } from 'src/common/media/interfaces';

export class ImageUpdateDto implements IImageCreate {
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	url: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	publicId: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	fileName: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsNumber()
	@IsNotEmpty()
	width: number;

	@IsOptional()
	@IsNumber()
	@IsNotEmpty()
	height: number;
}
