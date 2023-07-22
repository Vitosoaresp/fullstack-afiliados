export interface SaleDTO {
	product: string;
	price: number;
	seller: string;
	date: Date;
	typeId: number;
}

export interface Sale extends SaleDTO {
	id: string;
	transaction?: {
		id: number;
		description: string;
		natureOfTransaction: string;
	};
}

export interface SellersReport {
	seller: string;
	valueSold: number;
	type: 'producer' | 'affiliate';
}
