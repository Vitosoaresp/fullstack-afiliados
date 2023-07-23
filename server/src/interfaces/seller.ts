export interface Seller {
	id: string;
	name: string;
	type: string;
}

export interface SellerDTO extends Omit<Seller, 'id'> {}

export interface SellerReport {
	name: string;
	comission: number;
	type: string;
}
