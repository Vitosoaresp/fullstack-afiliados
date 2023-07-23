import { Model } from '../interfaces/model';
import { Sale, SaleDTO } from '../interfaces/sale';
import { Client } from '../lib/prisma';

export default class SaleModel implements Model<Sale> {
	constructor(private _prisma: Client) {}

	public async getAll() {
		const result = await this._prisma.sale.findMany({
			include: {
				product: true,
				seller: true,
			},
		});
		return result;
	}

	public async getById(id: string) {
		const result = await this._prisma.sale.findUnique({
			where: {
				id,
			},
			include: {
				product: true,
				seller: true,
			},
		});
		return result;
	}

	public async create(data: SaleDTO) {
		const result = await this._prisma.sale.create({
			data: {
				price: data.price,
				date: data.date,
				transaction: {
					connect: {
						id: data.typeId,
					},
				},
				product: {
					connectOrCreate: {
						where: {
							name: data.product,
						},
						create: {
							name: data.product,
						},
					},
				},
				seller: {
					connectOrCreate: {
						where: {
							name: data.seller,
						},
						create: {
							name: data.seller,
							type: data.typeId === 2 ? 'affiliate' : 'producer',
						},
					},
				},
			},
			include: {
				product: true,
				seller: true,
			},
		});
		return result;
	}

	public async update(id: string, data: SaleDTO) {
		const result = await this._prisma.sale.update({
			where: {
				id,
			},
			data: {
				price: data.price,
				date: data.date,
				transaction: {
					connect: {
						id: data.typeId,
					},
				},
				product: {
					connectOrCreate: {
						where: {
							name: data.product,
						},
						create: {
							name: data.product,
						},
					},
				},
				seller: {
					connectOrCreate: {
						where: {
							name: data.seller,
						},
						create: {
							name: data.seller,
							type: data.typeId === 2 ? 'affiliate' : 'producer',
						},
					},
				},
			},
			include: {
				product: true,
				seller: true,
			},
		});
		return result;
	}

	public async delete(id: string) {
		const result = await this._prisma.sale.delete({
			where: {
				id,
			},
			include: {
				product: true,
				seller: true,
			},
		});
		return result;
	}
}
