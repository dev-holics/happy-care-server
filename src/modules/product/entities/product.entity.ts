import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { IProductEntity } from 'src/modules/product/interfaces/product.entity.interface';

@Entity('products')
export class ProductEntity
	extends DatabaseEntityAbstract
	implements IProductEntity
{
	@Column({
		unique: true,
	})
	name: string;

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinColumn({ name: snakeCase('categoryId'), referencedColumnName: 'id' })
	category: CategoryEntity;
}
