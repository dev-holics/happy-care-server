import { OrderDetailEntity } from '.';
import { IOrderConsignmentEntity } from 'src/modules/order/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { snakeCase } from 'change-case';
import { ProductConsignmentEntity } from 'src/modules/product/entities';

@Entity('order_consignments')
export class OrderConsignmentEntity
	extends DatabaseEntityAbstract
	implements IOrderConsignmentEntity
{
	@Column({
		type: 'integer',
	})
	quantity: number;

	@ManyToOne(
		() => OrderDetailEntity,
		orderDetail => orderDetail.orderConsignments,
	)
	@JoinColumn({ name: snakeCase('orderDetailId'), referencedColumnName: 'id' })
	orderDetail: OrderDetailEntity;

	@ManyToOne(
		() => ProductConsignmentEntity,
		productConsignment => productConsignment.orderConsignments,
	)
	@JoinColumn({
		name: snakeCase('productConsignmentId'),
		referencedColumnName: 'id',
	})
	productConsignment: ProductConsignmentEntity;
}
