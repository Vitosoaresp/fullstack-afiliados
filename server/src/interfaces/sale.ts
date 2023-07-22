export interface SaleDTO {
	product: string;
	price: number;
	seller: string;
	date: Date;
	typeId: number;
}

export interface Sale extends SaleDTO {
	id: string;
}
