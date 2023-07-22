export interface Service<T> {
	findAll(): Promise<T[]>;
	create(data: unknown): Promise<T>;
}
