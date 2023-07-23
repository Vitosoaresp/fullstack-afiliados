export interface TransactionDTO {
	product: string;
	price: number;
	seller: string;
	date: Date;
	typeId: number;
}

export interface Transaction {
	id: string;
	date: Date;
	price: number;
	typeId: number;
	sellerId: string;
	productId: string;
	transaction?: {
		id: number;
		description: string;
		natureOfTransaction: string;
	};
	seller: {
		id: string;
		name: string;
		type: string;
	};
	product: {
		id: string;
		name: string;
	};
}

export interface SellersReport {
	seller: string;
	valueSold: number;
	type: 'producer' | 'affiliate';
}
