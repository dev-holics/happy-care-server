import { CartItemEntity } from 'src/modules/cart/entities/cart-item.entity';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';
import { ImageEntity } from 'src/common/media/entities/image.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TrademarkEntity } from 'src/modules/origin/entities/trademark.entity';
import { ProductDetailEntity } from 'src/modules/product/entities';
import { OriginEntity } from 'src/modules/origin/entities';

export interface IProductEntity {
	code: string;
	name: string;
	description: string;
	price: number;
	packingSpec: string;
	element: string;
	uses: string;
	subject: string;
	guide: string;
	preserve: string;
	category: CategoryEntity;
	trademark: TrademarkEntity;
	images: ImageEntity[];
	tags: TagEntity[];
	productDetails: ProductDetailEntity[];
	cartItems: CartItemEntity[];
	origin: OriginEntity;
}
