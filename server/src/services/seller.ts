import { ModelSeller } from '../interfaces/model';
import { Seller } from '../interfaces/seller';
import { ServiceSeller } from '../interfaces/services';
import { sellerSchema } from '../utils/validations';

export default class SellerService implements ServiceSeller {
	constructor(private _model: ModelSeller) {}

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

	public async getById(id: string): Promise<Seller> {
		const result = await this._model.getById(id);
		if (!result) {
			throw new Error('id not found');
		}
		return result;
	}

	public async update(id: string, data: unknown): Promise<Seller> {
		const dataParsed = sellerSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const result = await this._model.update(id, dataParsed.data);
		return result;
	}

	public async delete(id: string): Promise<Seller> {
		const deleted = await this._model.delete(id);
		return deleted;
	}

	public async getProducers() {
		const result = await this._model.getProducers();
		return result;
	}

	public async getAffiliates() {
		const result = await this._model.getAffiliates();
		return result;
	}
}
