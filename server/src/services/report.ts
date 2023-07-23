import { PrismaClient } from '@prisma/client';
import { SellersReport } from '../interfaces/transaction';

export default class ReportService {
	constructor(private _client: PrismaClient) {}

	public async getProducers(): Promise<SellersReport[]> {
		const reports: any = await this._client.$queryRaw`
			SELECT
				sellerId,
				se.name,
				se.type as type,
				SUM(price) as valueSold
			FROM sale
			WHERE transactionId IN ('1', '4') GROUP BY sellerId INNER JOIN seller as se ON seller.id = sale.sellerId;
		`;

		return reports.map((report: any) => ({
			seller: report.name as string,
			valueSold: report.valueSold as number,
			type: report.type as string,
		}));
	}

	// public async getAffiliates(): Promise<SellersReport[]> {
	// 	const reports = await this._client.groupBy({
	// 		by: ['seller'],
	// 		_sum: {
	// 			price: true,
	// 		},
	// 		where: {
	// 			transaction: {
	// 				id: {
	// 					equals: 2,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	const getPayments = await this._client.groupBy({
	// 		by: ['seller'],
	// 		_sum: {
	// 			price: true,
	// 		},
	// 		where: {
	// 			transaction: {
	// 				id: {
	// 					equals: 3,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	const data = reports.reduce((acc, current) => {
	// 		const found = getPayments.find((item) => item.seller === current.seller);
	// 		if (found) {
	// 			acc.push({
	// 				seller: found.seller,
	// 				valueSold:
	// 					(current._sum.price as number) - (found._sum.price as number),
	// 				type: 'affiliate',
	// 			});
	// 		}
	// 		return acc;
	// 	}, [] as SellersReport[]);

	// 	return data as SellersReport[];
	// }
}
