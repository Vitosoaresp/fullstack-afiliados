import { Model } from '../interfaces/model';
import { Sale } from '../interfaces/sale';
import { Service } from '../interfaces/services';
import { saleSchema } from '../utils/validations';

export default class SaleService implements Service<Sale> {
	constructor(private _model: Model<Sale>) {}

	public async getAll(): Promise<Sale[]> {
		const result = await this._model.getAll();
		return result;
	}

	public async create(data: unknown): Promise<Sale> {
		const dataParsed = saleSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const create = await this._model.create(dataParsed.data);
		return create;
	}
}
