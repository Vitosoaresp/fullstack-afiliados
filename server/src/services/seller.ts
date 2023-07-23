import { Model } from '../interfaces/model';
import { Seller } from '../interfaces/seller';
import { Service } from '../interfaces/services';
import { sellerSchema } from '../utils/validations';

export default class SellerService implements Service<Seller> {
	constructor(private _model: Model<Seller>) {}

	public async getAll(): Promise<Seller[]> {
		return await this._model.getAll();
	}

	public async create(data: unknown): Promise<Seller> {
		const parsedData = sellerSchema.safeParse(data);
		if (!parsedData.success) {
			throw parsedData.error;
		}
		return await this._model.create(parsedData.data);
	}
}
