import { Transaction } from './transaction.ts';

export interface Seller {
	id: string;
	name: string;
	type: 'affiliate' | 'producer';
	Transaction: Transaction[];
}
