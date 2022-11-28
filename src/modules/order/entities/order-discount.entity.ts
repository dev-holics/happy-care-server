import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { snakeCase } from 'change-case';
import { OrderEntity } from '.';
import { IOrderDiscountEntity } from 'src/modules/order/interfaces';

@Entity('order_discounts')
export class OrderDiscountEntity
	extends DatabaseEntityAbstract
	implements IOrderDiscountEntity
{
	@Column()
	code: string;

	@Column()
	discount: number;

	@Column()
	description: string;

	@ManyToOne(() => OrderEntity, order => order.orderDiscounts)
	@JoinColumn({ name: snakeCase('orderId'), referencedColumnName: 'id' })
	order: OrderEntity;
}
