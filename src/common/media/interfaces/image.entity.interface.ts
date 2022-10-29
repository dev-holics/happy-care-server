import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export interface IImageEntity {
	url: string;

	publicId: string;

	fileName: string;

	description: string;

	width: number;

	height: number;

	user: UserEntity;

	category: CategoryEntity;

	product: ProductEntity;
}
