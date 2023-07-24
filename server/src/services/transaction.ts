import { ModelTransaction } from '../interfaces/model';
import { Service } from '../interfaces/services';
import { Transaction, TransactionDTO } from '../interfaces/transaction';
import { transactionSchema, transactionsSchema } from '../utils/validations';

export default class TransactionService implements Service<Transaction> {
	constructor(private _model: ModelTransaction) {}

	public async getAll(): Promise<Transaction[]> {
		const result = await this._model.getAll();
		return result;
	}

	public async create(data: unknown): Promise<Transaction> {
		const dataParsed = transactionSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const create = await this._model.create(dataParsed.data);
		return create;
	}

	public async getById(id: string): Promise<Transaction> {
		const result = await this._model.getById(id);
		if (!result) {
			throw new Error('id not found');
		}
		return result;
	}

	public async update(id: string, data: unknown): Promise<Transaction> {
		const dataParsed = transactionSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const result = await this._model.update(id, dataParsed.data);
		return result;
	}

	public async delete(id: string): Promise<Transaction> {
		const deleted = await this._model.delete(id);
		return deleted;
	}

	public async createMany(data: TransactionDTO[]) {
		const dataParsed = transactionsSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const create = await this._model.createMany(
			dataParsed.data.map((transaction) => ({
				...transaction,
				date: new Date(transaction.date),
			})),
		);
		return create;
	}
}
