import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';
import { ImageEntity } from 'src/common/media/entities/image.entity';

export interface ICategoryEntity {
	name: string;

	description: string;

	order: number;

	images: ImageEntity[];

	parent: CategoryEntity;

	children: CategoryEntity[];

	products: ProductEntity[];
}
