import { Request, Response } from 'express';
import { Seller } from '../interfaces/seller';
import { Service } from '../interfaces/services';

export class SellersController {
	constructor(private _service: Service<Seller>) {}

	public async getAll(req: Request, res: Response) {
		const reports = await this._service.getAll();
		return res.status(200).json(reports);
	}

	public async create(req: Request, res: Response) {
		const reports = await this._service.create(req.body);
		return res.status(200).json(reports);
	}
}
