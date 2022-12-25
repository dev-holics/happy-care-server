import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { snakeCase } from 'change-case';
import { IProductConsignment } from 'src/modules/product/interfaces';
import { ProductDetailEntity } from '.';

@Entity('product_consignments')
export class ProductConsignmentEntity
	extends DatabaseEntityAbstract
	implements IProductConsignment
{
	@Column({ default: 0 })
	quantity: number;

	@Column({ type: 'date' })
	expired: Date;

	@ManyToOne(
		() => ProductDetailEntity,
		productDetail => productDetail.productConsignments,
	)
	@JoinColumn({
		name: snakeCase('productDetailId'),
		referencedColumnName: 'id',
	})
	productDetail: ProductDetailEntity;
}
