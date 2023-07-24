import { Request, Response } from 'express';
import { ServiceTransaction } from '../interfaces/services';

export default class TransactionController {
	constructor(private _service: ServiceTransaction) {}

	public async findAll(_req: Request, res: Response) {
		const result = await this._service.getAll();
		return res.status(200).json(result);
	}

	public async create(req: Request, res: Response) {
		const data = req.body;
		if (Array.isArray(data)) {
			const created = await this._service.createMany(data);
			return res.status(201).json(created);
		}
		const created = await this._service.create(req.body);
		return res.status(201).json(created);
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
}
