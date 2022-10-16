import { Column, Entity, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ICategoryEntity } from 'src/modules/category/interfaces/category.entity.interface';

@Entity('categories')
export class CategoryEntity extends DatabaseEntityAbstract implements ICategoryEntity {
	@Column({
		length: 255,
		unique: true,
	})
	name: string;

	@OneToMany(() => ProductEntity, product => product.category)
	products: ProductEntity[];
}
