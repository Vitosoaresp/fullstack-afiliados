import { Model } from '../interfaces/model';
import { Product } from '../interfaces/product';
import { Service } from '../interfaces/services';
import { productSchema } from '../utils/validations';

export default class ProductService implements Service<Product> {
	constructor(private _model: Model<Product>) {}

	public async getAll(): Promise<Product[]> {
		return await this._model.getAll();
	}

	public async create(data: unknown): Promise<Product> {
		const parsedData = productSchema.safeParse(data);
		if (!parsedData.success) {
			throw parsedData.error;
		}
		return await this._model.create(parsedData.data);
	}

	public async getById(id: string): Promise<Product> {
		const result = await this._model.getById(id);
		if (!result) {
			throw new Error('id not found');
		}
		return result;
	}

	public async update(id: string, data: unknown): Promise<Product> {
		const dataParsed = productSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const result = await this._model.update(id, dataParsed.data);
		return result;
	}

	public async delete(id: string): Promise<Product> {
		const deleted = await this._model.delete(id);
		return deleted;
	}
}
