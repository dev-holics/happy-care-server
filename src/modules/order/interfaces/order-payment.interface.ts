import { OrderEntity } from 'src/modules/order/entities';

export interface IOrderPayment {
	isPay: boolean;

	vnpBankCode: string;

	vnpBankTranNo: string;

	vnpCardType: string;

	vnpPayDate: string;

	vnpOrderInfo: string;

	vnpTransactionNo: string;

	orders: OrderEntity[];
}
