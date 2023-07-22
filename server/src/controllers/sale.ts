import { Request, Response } from 'express';
import { Sale } from '../interfaces/sale';
import { Service } from '../interfaces/services';

export default class SaleController {
	constructor(private _service: Service<Sale>) {}

	public async findAll(_req: Request, res: Response) {
		const result = await this._service.findAll();
		return res.status(200).json(result);
	}

	public async create(req: Request, res: Response) {
		const created = await this._service.create(req.body);
		return res.status(201).json(created);
	}
}
