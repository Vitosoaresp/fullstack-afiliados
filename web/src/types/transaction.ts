export interface Transaction {
	date: string;
	id: string;
	price: number;
	productId: string;
	sellerId: string;
	typeId: number;
	seller: {
		id: string;
		name: string;
	};
	product: {
		id: string;
		name: string;
	};
	transaction: {
		description: string;
		natureOfTransaction: string;
	};
}

export interface SubmitTransaction {
	date: Date;
	price: number;
	seller: string;
	product: string;
	typeId: number;
}
