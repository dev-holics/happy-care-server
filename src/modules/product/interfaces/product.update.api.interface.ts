import { ImageUpdateDto } from 'src/common/media/dtos';

export interface IProductUpdate {
	name: string;
	description: string;
	price: number;
	trademarkId: string;
	originId: string;
	element: string;
	uses: string;
	subject: string;
	guide: string;
	preserve: string;
	packingSpec: string;
	categoryId: string;
	images: ImageUpdateDto[];
}
