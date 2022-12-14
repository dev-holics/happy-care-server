import {
	Column,
	Entity,
	OneToMany,
	Tree,
	TreeChildren,
	TreeParent,
	Unique,
} from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ICategoryEntity } from 'src/modules/category/interfaces/category.entity.interface';
import { ImageEntity } from 'src/common/media/entities/image.entity';

@Entity('categories', {
	orderBy: {
		order: 'ASC',
	},
})
@Tree('materialized-path')
@Unique(['order', 'parent'])
export class CategoryEntity
	extends DatabaseEntityAbstract
	implements ICategoryEntity
{
	@Column({
		length: 255,
		unique: true,
	})
	name: string;

	@Column({
		nullable: true,
	})
	description: string;

	@Column({
		unsigned: true,
	})
	order: number;

	@Column({})
	slug: string;

	@OneToMany(() => ImageEntity, image => image.category)
	images: ImageEntity[];

	@TreeChildren()
	children: CategoryEntity[];

	@TreeParent()
	parent: CategoryEntity;

	@OneToMany(() => ProductEntity, product => product.category)
	products: ProductEntity[];
}
