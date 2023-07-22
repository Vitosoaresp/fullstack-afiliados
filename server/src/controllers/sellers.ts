import { Request, Response } from 'express';
import { SellersReport } from '../interfaces/sale';
import { ServiceReport } from '../interfaces/services';

export class SellersController {
	constructor(private _service: ServiceReport<SellersReport>) {}

	public async getProducers(req: Request, res: Response) {
		const reports = await this._service.getProducers();
		return res.status(200).json(reports);
	}

	public async getAffiliates(req: Request, res: Response) {
		const reports = await this._service.getAffiliates();
		return res.status(200).json(reports);
	}
}
