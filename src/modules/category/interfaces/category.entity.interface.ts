import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryEntity {
	name: string;

	description: string;

	order: number;

	image: AwsFileEntity;

	parent: CategoryEntity;

	children: CategoryEntity[];

	products: ProductEntity[];
}
