import { ModelSeller } from '../interfaces/model';
import { Seller, SellerDTO } from '../interfaces/seller';
import { Client } from '../lib/prisma';

export default class SellerModel implements ModelSeller {
	constructor(private _prisma: Client) {}

	public async getAll(): Promise<Seller[]> {
		const result = await this._prisma.seller.findMany();
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

	public async getProducers() {
		const result = await this._prisma.seller.findMany({
			where: {
				type: 'producer',
			},
			include: {
				Sale: {
					where: {
						typeId: {
							in: [1, 4],
						},
					},
				},
			},
		});
		const data = result.map((seller) => ({
			name: seller.name,
			comission: seller.Sale.reduce((acc, current) => acc + current.price, 0),
			type: seller.type,
		}));

		return data;
	}

	public async getAffiliates() {
		const result = await this._prisma.seller.findMany({
			where: {
				type: 'affiliate',
			},
			include: {
				Sale: {
					where: {
						typeId: {
							in: [2, 3],
						},
					},
				},
			},
		});

		const data = result.map((seller) => ({
			name: seller.name,
			comission: seller.Sale.reduce((acc, current) => {
				if (current.typeId === 2) {
					return acc + current.price;
				}
				return acc - current.price;
			}, 0),
			type: seller.type,
		}));

		return data;
	}
}
