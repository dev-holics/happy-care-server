import { IsArray } from 'class-validator';
import { IImageDelete } from 'src/common/media/interfaces';

export class ImageDeleteDto implements IImageDelete {
	@IsArray()
	imageIds: string[];
}
