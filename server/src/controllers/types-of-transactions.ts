import { Request, Response } from 'express';
import { Service } from '../interfaces/services';
import { TransactionsTypes } from '../interfaces/types-of-transactions';

export default class TransactionsTypesController {
	constructor(private _service: Service<TransactionsTypes>) {}

	public async findAll(_req: Request, res: Response) {
		const result = await this._service.findAll();
		return res.status(200).json(result);
	}
}
