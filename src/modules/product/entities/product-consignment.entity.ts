import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { snakeCase } from 'change-case';
import { IProductConsignment } from 'src/modules/product/interfaces';
import { ProductDetailEntity } from '.';
import { OrderConsignmentEntity } from 'src/modules/order/entities';

@Entity('product_consignments')
export class ProductConsignmentEntity
	extends DatabaseEntityAbstract
	implements IProductConsignment
{
	@Column({ default: 0 })
	quantity: number;

	@Column({ type: 'date' })
	expired: Date;

	@OneToMany(
		() => OrderConsignmentEntity,
		orderConsignment => orderConsignment.productConsignment,
	)
	orderConsignments: OrderConsignmentEntity[];

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
