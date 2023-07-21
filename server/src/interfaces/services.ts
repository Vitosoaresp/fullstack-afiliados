export interface Service<T> {
	findAll(): Promise<T[]>;
}
