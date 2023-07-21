import { TypesOfTransactionsModel } from '../interfaces/prisma';
import { Service } from '../interfaces/services';
import { TransactionsTypes } from '../interfaces/types-of-transactions';

class TypesOfTransactions implements Service<TransactionsTypes> {
	constructor(private _client: TypesOfTransactionsModel) {}

	public async findAll(): Promise<TransactionsTypes[]> {
		const result = await this._client.findMany();
		return result;
	}
}

export default TypesOfTransactions;
