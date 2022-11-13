import { Column, Entity } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IOrderPayment } from 'src/modules/order/interfaces';

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
}
