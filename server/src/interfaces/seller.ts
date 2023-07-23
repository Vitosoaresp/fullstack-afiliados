export interface Seller {
	id: string;
	name: string;
	type: string;
}

export interface SellerDTO extends Omit<Seller, 'id'> {}
