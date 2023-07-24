export interface Seller {
	id: string;
	name: string;
	type: 'affiliate' | 'producer';
	Transaction: {
		date: string;
		id: string;
		price: number;
		productId: string;
		sellerId: string;
		typeId: number;
	};
}
