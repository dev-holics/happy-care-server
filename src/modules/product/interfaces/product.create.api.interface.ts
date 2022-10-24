import { ImageCreateDto } from 'src/common/media/dtos';

export interface IProductCreate {
	name: string;
	description: string;
	price: number;
	originId: string;
	categoryId: string;
	images: ImageCreateDto[];
}
