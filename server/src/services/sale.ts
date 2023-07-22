import { SaleModel } from '../interfaces/prisma';
import { Sale } from '../interfaces/sale';
import { Service } from '../interfaces/services';
import { saleSchema } from '../utils/validations';

export default class SaleService implements Service<Sale> {
	constructor(private _client: SaleModel) {}

	public async findAll(): Promise<Sale[]> {
		const result = await this._client.findMany({
			include: { transaction: true },
		});
		return result;
	}

	public async create(data: unknown): Promise<Sale> {
		const dataParsed = saleSchema.safeParse(data);
		if (!dataParsed.success) {
			throw dataParsed.error;
		}

		const result = await this._client.create({
			data: dataParsed.data,
			include: { transaction: true },
		});
		return result;
	}
}
