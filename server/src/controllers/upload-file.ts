import { Request, Response } from 'express';
import { ServiceUpload } from '../interfaces/services';

export default class UploadFileController {
	constructor(private _service: ServiceUpload) {}

	public async createMany(req: Request, res: Response) {
		const created = await this._service.createMany(req.body);
		return res.status(201).json(created);
	}
}
