import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IOrderPayment } from 'src/modules/order/interfaces';
import { OrderEntity } from './order.entity';
import { snakeCase } from 'change-case';

@Entity('order_payments')
export class OrderPaymentEntity
	extends DatabaseEntityAbstract
	implements IOrderPayment
{
	@Column({ default: false })
	isPay: boolean;

	@Column({ nullable: true })
	vnpBankCode: string;

	@Column({ nullable: true })
	vnpBankTranNo: string;

	@Column({ nullable: true })
	vnpCardType: string;

	@Column({ nullable: true })
	vnpPayDate: string;

	@Column({ nullable: true })
	vnpOrderInfo: string;

	@Column({ nullable: true })
	vnpTransactionNo: string;

	@OneToOne(() => OrderEntity, order => order.orderPayment)
	@JoinColumn({ name: snakeCase('orderId'), referencedColumnName: 'id' })
	order: OrderEntity;
}
