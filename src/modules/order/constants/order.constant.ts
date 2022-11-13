/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
export enum ENUM_PAYMENT_TYPES {
	TRANSFER = 'TRANSFER',
	CASH = 'CASH',
}

export enum ENUM_ORDER_STATUS {
	PROCESSING = 'PROCESSING',
	CONFIRMED = 'CONFIRMED',
	DELIVERING = 'DELIVERING',
	SUCCESS = 'SUCCESS',
	CANCELED = 'CANCELED',
}

export enum ENUM_ORDER_TYPES {
	ONLINE_STORE = 'ONLINE_STORE',
	OFFLINE_STORE = 'OFFLINE_STORE',
}

export enum ENUM_VNPAY_COMMAND {
	PAY = 'pay',
	QUERYDR = 'querydr',
}
