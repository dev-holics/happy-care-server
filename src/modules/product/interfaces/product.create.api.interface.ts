import { ImageCreateDto } from 'src/common/media/dtos';

export interface IProductCreate {
	name: string;
	description: string;
	price: number;
	originId: string;
	element: string;
	uses: string;
	subject: string;
	guide: string;
	preserve: string;
	packingSpec: string;
	unit: string;
	categoryId: string;
	images: ImageCreateDto[];
}
