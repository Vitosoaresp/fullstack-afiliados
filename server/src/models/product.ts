import { Model } from '../interfaces/model';
import { Product, ProductDTO } from '../interfaces/product';
import { Client } from '../lib/prisma';

export default class ProductModel implements Model<Product> {
	constructor(private _prisma: Client) {}

	public async getAll(): Promise<Product[]> {
		const result = await this._prisma.product.findMany();
		return result;
	}

	public async getById(id: string): Promise<Product | null> {
		const result = await this._prisma.product.findUnique({
			where: {
				id,
			},
		});
		return result;
	}

	public async create(data: ProductDTO): Promise<Product> {
		const result = await this._prisma.product.create({
			data,
		});
		return result;
	}

	public async update(id: string, data: ProductDTO): Promise<Product> {
		const result = await this._prisma.product.update({
			where: {
				id,
			},
			data,
		});
		return result;
	}

	public async delete(id: string): Promise<Product> {
		const result = await this._prisma.product.delete({
			where: {
				id,
			},
		});
		return result;
	}
}
