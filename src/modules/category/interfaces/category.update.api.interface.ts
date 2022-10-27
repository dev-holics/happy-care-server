import { ImageUpdateDto } from 'src/common/media/dtos';

export interface ICategoryUpdate {
	name: string;
	description: string;
	order: number;
	parentId: string;
	images: ImageUpdateDto[];
}
