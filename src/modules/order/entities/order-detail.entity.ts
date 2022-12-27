import { OrderConsignmentEntity, OrderEntity } from '.';
import { IOrderDetailEntity } from 'src/modules/order/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { snakeCase } from 'change-case';

@Entity('order_details')
export class OrderDetailEntity
	extends DatabaseEntityAbstract
	implements IOrderDetailEntity
{
	@Column({
		type: 'integer',
	})
	quantity: number;

	@OneToMany(
		() => OrderConsignmentEntity,
		orderConsignment => orderConsignment.orderDetail,
	)
	orderConsignments: OrderConsignmentEntity[];

	@ManyToOne(() => OrderEntity, order => order.orderDetails)
	@JoinColumn({ name: snakeCase('orderId'), referencedColumnName: 'id' })
	order: OrderEntity;
}
