export interface Service<T> {
	getAll(): Promise<T[]>;
	create(data: unknown): Promise<T>;
	getById(id: string): Promise<T>;
	update(id: string, data: unknown): Promise<T>;
	delete(id: string): Promise<T>;
}

export interface ServiceReport<T> {
	getProducers(): Promise<T[]>;
	getAffiliates(): Promise<T[]>;
}
