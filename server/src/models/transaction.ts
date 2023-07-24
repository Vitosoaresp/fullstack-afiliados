import { ModelTransaction } from '../interfaces/model';
import { Transaction, TransactionDTO } from '../interfaces/transaction';
import { Client } from '../lib/prisma';

export default class TransactionModel implements ModelTransaction {
	constructor(private _prisma: Client) {}

	public async getAll(): Promise<Transaction[]> {
		const result = await this._prisma.transaction.findMany({
			include: {
				product: true,
				seller: true,
				transaction: true,
			},
		});
		return result;
	}

	public async getById(id: string) {
		const result = await this._prisma.transaction.findUnique({
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

	public async create(data: TransactionDTO) {
		const result = await this._prisma.transaction.create({
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

	public async update(id: string, data: TransactionDTO) {
		const result = await this._prisma.transaction.update({
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
		const result = await this._prisma.transaction.delete({
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

	public async createMany(data: TransactionDTO[]) {
		return await this._prisma.$transaction(async (tx) => {
			await tx.product.createMany({
				data: data.map((item) => ({
					name: item.product,
				})),
				skipDuplicates: true,
			});

			await tx.seller.createMany({
				data: data.map((item) => ({
					name: item.seller,
					type: item.typeId === 2 ? 'affiliate' : 'producer',
				})),
				skipDuplicates: true,
			});
			const sellers = await tx.seller.findMany({});
			const products = await tx.product.findMany({});

			return await tx.transaction.createMany({
				data: data.map((item) => ({
					price: item.price,
					date: item.date,
					typeId: item.typeId,
					productId: products.find((product) => product.name === item.product)
						?.id as string,
					sellerId: sellers.find((seller) => seller.name === item.seller)
						?.id as string,
				})),
			});
		});
	}
}
