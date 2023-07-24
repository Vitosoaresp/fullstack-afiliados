import { TransactionDTO } from './transaction';
import { User } from './user';

export interface Service<T> {
	getAll(): Promise<T[]>;
	create(data: unknown): Promise<T>;
	getById(id: string): Promise<T>;
	update(id: string, data: unknown): Promise<T>;
	delete(id: string): Promise<T>;
}

export interface ServiceUpload {
	createMany(data: TransactionDTO[]): Promise<{ count: number }>;
}

export interface ServiceAuth {
	register(data: unknown): Promise<Omit<User, 'password'>>;
	login(data: unknown): Promise<string>;
}
