import { Seller } from '@prisma/client';
import { SellerReport } from './seller';
import { SaleDTO } from './transaction';

export interface Service<T> {
	getAll(): Promise<T[]>;
	create(data: unknown): Promise<T>;
	getById(id: string): Promise<T>;
	update(id: string, data: unknown): Promise<T>;
	delete(id: string): Promise<T>;
}

export interface ServiceSeller extends Service<Seller> {
	getProducers(): Promise<SellerReport[]>;
	getAffiliates(): Promise<SellerReport[]>;
}

export interface ServiceUpload {
	createMany(data: SaleDTO[]): Promise<{ count: number }>;
}
