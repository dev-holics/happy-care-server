/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
export enum ENUM_PAYMENT_TYPES {
	TRANSFER = 'TRANSFER',
	CASH = 'CASH',
}

export enum ENUM_ORDER_STATUS {
	PROCESSING = 'PROCESSING', // Customer has just placed the order
	CONFIRMED = 'CONFIRMED', // Pharmacist has confirmed the order
	DELIVERING = 'DELIVERING', // Pharmacist is delivering the order, customer can not cancel the order
	DELIVERED = 'DELIVERED', // Order has been delivered
	RECEIVED = 'RECEIVED', // Customer has received the order or Pharmacist has created the order, cannot cancel
	CANCELED = 'CANCELED', // Order has been canceled or Pharmacist has canceled the order
}

export enum ENUM_DELIVERY_METHOD {
	SHIP = 'SHIP',
	PICK_UP = 'PICK_UP',
}

export enum ENUM_ORDER_TYPES {
	ONLINE_STORE = 'ONLINE_STORE',
	OFFLINE_STORE = 'OFFLINE_STORE',
}

export enum ENUM_VNPAY_COMMAND {
	PAY = 'pay',
	QUERYDR = 'querydr',
}
