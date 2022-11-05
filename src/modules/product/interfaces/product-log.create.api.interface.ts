export interface IProductLogCreate {
	quantity: number;
	transactionDate: Date;
	type: string;
	branchId: string;
	productId: string;
}
