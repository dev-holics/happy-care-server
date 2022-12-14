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
import { TrademarkEntity, OriginEntity } from 'src/modules/origin/entities';
import { ImageEntity } from 'src/common/media/entities/image.entity';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';
import { IProductEntity } from 'src/modules/product/interfaces';
import { ProductDetailEntity, ProductLogEntity } from '.';
import { CartItemEntity } from 'src/modules/cart/entities/cart-item.entity';
import { FeedbackEntity } from 'src/modules/feedback/entities/feedback.entity';

@Entity('products')
export class ProductEntity
	extends DatabaseEntityAbstract
	implements IProductEntity
{
	@Column({ unique: true })
	code: string;

	@Column({ unique: true })
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	packingSpec: string;

	@Column()
	unit: string;

	@Column()
	price: number;

	@Column({ nullable: true })
	element: string;

	@Column({ nullable: true, default: 0 })
	discount: number;

	@Column({ nullable: true })
	uses: string;

	@Column({ nullable: true })
	subject: string;

	@Column({ nullable: true })
	guide: string;

	@Column({ nullable: true })
	preserve: string;

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinColumn({ name: snakeCase('categoryId'), referencedColumnName: 'id' })
	category: CategoryEntity;

	@ManyToOne(() => TrademarkEntity, trademark => trademark.products)
	@JoinColumn({ name: snakeCase('trademarkId'), referencedColumnName: 'id' })
	trademark: TrademarkEntity;

	@ManyToOne(() => OriginEntity, origin => origin.products)
	@JoinColumn({ name: snakeCase('originId'), referencedColumnName: 'id' })
	origin: OriginEntity;

	@OneToMany(() => ProductLogEntity, productLog => productLog.product)
	productLogs: ProductLogEntity[];

	@OneToMany(() => ImageEntity, image => image.product)
	images: ImageEntity[];

	@OneToMany(() => ProductDetailEntity, productDetail => productDetail.product)
	productDetails: ProductDetailEntity[];

	@OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
	cartItems: CartItemEntity[];

	@OneToMany(() => FeedbackEntity, feedback => feedback.product)
	feedbacks: FeedbackEntity[];

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
