import { CategoryEntity } from 'src/modules/category/entities';

export interface ICategoryCreate {
	readonly name: string;

	readonly description?: string;

	readonly order: number;

	readonly parent?: CategoryEntity;
}
