import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { IProductEntity } from 'src/modules/product/interfaces';
import { TrademarkEntity } from 'src/modules/made/entities';
import { ProductDetailEntity, ProductLogEntity } from '.';
import { ImageEntity } from 'src/common/media/entities/image.entity';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';

@Entity('products')
export class ProductEntity
	extends DatabaseEntityAbstract
	implements IProductEntity
{
	@Column({ unique: true })
	code: string;

	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinColumn({ name: snakeCase('categoryId'), referencedColumnName: 'id' })
	category: CategoryEntity;

	@ManyToOne(() => TrademarkEntity, trademark => trademark.products)
	@JoinColumn({ name: snakeCase('trademarkId'), referencedColumnName: 'id' })
	trademark: TrademarkEntity;

	@OneToMany(() => ProductLogEntity, productLog => productLog.product)
	productLogs: ProductLogEntity[];

	@OneToMany(() => ImageEntity, image => image.product)
	images: ImageEntity[];

	@OneToMany(() => ProductDetailEntity, productDetail => productDetail.product)
	productDetails: ProductDetailEntity[];

	@ManyToMany(() => TagEntity, tag => tag.products, {
		cascade: true,
	})
	@JoinTable({
		name: 'product_tags',
		joinColumn: {
			name: snakeCase('productId'),
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: snakeCase('tagId'),
			referencedColumnName: 'id',
		},
	})
	tags: TagEntity[];
}
