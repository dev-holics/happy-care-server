import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IImageCreate } from 'src/common/media/interfaces';

export class ImageCreateDto implements IImageCreate {
	@IsString()
	@IsNotEmpty()
	url: string;

	@IsString()
	@IsNotEmpty()
	publicId: string;

	@IsString()
	@IsNotEmpty()
	fileName: string;

	@IsString()
	description: string;

	@IsNumber()
	@IsNotEmpty()
	width: number;

	@IsNumber()
	@IsNotEmpty()
	height: number;
}
