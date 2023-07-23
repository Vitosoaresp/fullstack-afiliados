import { Model } from '../interfaces/model';
import { Service } from '../interfaces/services';
import { Transaction } from '../interfaces/transaction';
import { transactionSchema } from '../utils/validations';

export default class TransactionService implements Service<Transaction> {
	constructor(private _model: Model<Transaction>) {}

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
}
