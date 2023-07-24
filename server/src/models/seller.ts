import { Model } from '../interfaces/model';
import { Seller, SellerDTO } from '../interfaces/seller';
import { Client } from '../lib/prisma';

export default class SellerModel implements Model<Seller> {
	constructor(private _prisma: Client) {}

	public async getAll(): Promise<Seller[]> {
		const result = await this._prisma.seller.findMany({
			include: { Transaction: true },
		});
		return result;
	}

	public async getById(id: string): Promise<Seller | null> {
		const result = await this._prisma.seller.findUnique({
			where: {
				id,
			},
		});
		return result;
	}

	public async create(data: SellerDTO): Promise<Seller> {
		const result = await this._prisma.seller.create({
			data,
		});
		return result;
	}

	public async update(id: string, data: SellerDTO): Promise<Seller> {
		const result = await this._prisma.seller.update({
			where: {
				id,
			},
			data,
		});
		return result;
	}

	public async delete(id: string): Promise<Seller> {
		const result = await this._prisma.seller.delete({
			where: {
				id,
			},
		});
		return result;
	}
}
