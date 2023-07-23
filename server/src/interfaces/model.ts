import { Seller } from '@prisma/client';
import { SellerReport } from './seller';

export interface Model<T> {
	getAll(): Promise<T[]>;
	getById(id: string): Promise<T | null>;
	create(data: unknown): Promise<T>;
	update(id: string, data: unknown): Promise<T>;
	delete(id: string): Promise<T>;
}

export interface ModelSeller extends Model<Seller> {
	getProducers(): Promise<SellerReport[]>;
	getAffiliates(): Promise<SellerReport[]>;
}
