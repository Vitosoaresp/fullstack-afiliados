export interface Service<T> {
	findAll(): Promise<T[]>;
	create(data: unknown): Promise<{ count: number }>;
}

export interface ServiceReport<T> {
	getProducers(): Promise<T[]>;
	getAffiliates(): Promise<T[]>;
}
