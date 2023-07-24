import { Request, Response } from 'express';
import { ServiceAuth } from '../interfaces/services';

export default class Authentication {
	constructor(private _service: ServiceAuth) {}

	public async register(req: Request, res: Response) {
		const data = req.body;
		const user = await this._service.register(data);
		return res.status(201).json(user);
	}

	public async login(req: Request, res: Response) {
		const data = req.body;
		const token = await this._service.login(data);
		return res.status(200).json({ token });
	}
}
