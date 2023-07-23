import { Request, Response } from 'express';
import { ServiceSeller } from '../interfaces/services';

export class SellersController {
	constructor(private _service: ServiceSeller) {}

	public async getAll(req: Request, res: Response) {
		const reports = await this._service.getAll();
		return res.status(200).json(reports);
	}

	public async create(req: Request, res: Response) {
		const reports = await this._service.create(req.body);
		return res.status(201).json(reports);
	}

	public async findById(req: Request, res: Response) {
		const result = await this._service.getById(req.params.id);
		return res.status(200).json(result);
	}

	public async update(req: Request, res: Response) {
		const result = await this._service.update(req.params.id, req.body);
		return res.status(200).json(result);
	}

	public async delete(req: Request, res: Response) {
		const deleted = await this._service.delete(req.params.id);
		return res.status(200).json(deleted);
	}

	public async getProducers(req: Request, res: Response) {
		const result = await this._service.getProducers();
		return res.status(200).json(result);
	}

	public async getAffiliates(req: Request, res: Response) {
		const result = await this._service.getAffiliates();
		return res.status(200).json(result);
	}
}
