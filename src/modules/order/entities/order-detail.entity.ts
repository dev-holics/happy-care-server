import { OrderEntity } from '.';
import { IOrderDetailEntity } from 'src/modules/order/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
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

	@ManyToOne(() => ProductEntity, product => product.orderDetails)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;

	@ManyToOne(() => OrderEntity, order => order.orderDetails)
	@JoinColumn({ name: snakeCase('orderId'), referencedColumnName: 'id' })
	order: OrderEntity;
}
