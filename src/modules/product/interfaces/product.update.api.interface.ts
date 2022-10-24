import { ImageUpdateDto } from 'src/common/media/dtos';

export interface IProductUpdate {
	name: string;
	description: string;
	price: number;
	trademarkId: string;
	originId: string;
	categoryId: string;
	images: ImageUpdateDto[];
}
