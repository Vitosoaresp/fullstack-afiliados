import { PrismaClient } from '@prisma/client';
import { ServiceUpload } from '../interfaces/services';
import { SaleDTO } from '../interfaces/transaction';

export default class UploadFileService implements ServiceUpload {
	constructor(private _prisma: PrismaClient) {}

	public async createMany(data: SaleDTO[]) {
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

			return await tx.sale.createMany({
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
