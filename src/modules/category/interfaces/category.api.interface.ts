import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export interface ICategoryCreate {
	readonly name: string;

	readonly parent?: CategoryEntity;
}
