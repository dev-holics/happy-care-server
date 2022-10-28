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
import { OrderDetailEntity } from 'src/modules/order/entities/order-detail.entity';
import { CartItemEntity } from 'src/modules/cart/entities/cart-item.entity';

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
	packingSpec: string;

	@Column()
	price: number;

	@Column()
	element: string;

	@Column()
	uses: string;

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

	@OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.product)
	orderDetails: OrderDetailEntity[];

	@OneToMany(() => ProductDetailEntity, productDetail => productDetail.product)
	productDetails: ProductDetailEntity[];

	@OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
	cartItems: CartItemEntity[];

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
