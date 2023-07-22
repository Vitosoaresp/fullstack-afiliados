import { SaleModel } from '../interfaces/prisma';
import { SellersReport } from '../interfaces/sale';
import { ServiceReport } from '../interfaces/services';

export default class SellersService implements ServiceReport<SellersReport> {
	constructor(private _client: SaleModel) {}

	public async getProducers(): Promise<SellersReport[]> {
		const reports = await this._client.groupBy({
			by: ['seller'],
			_sum: {
				price: true,
			},
			where: {
				transaction: {
					id: {
						in: [1, 4],
					},
				},
			},
		});

		return reports.map((report) => ({
			seller: report.seller,
			valueSold: report._sum.price as number,
			type: 'producer',
		}));
	}

	public async getAffiliates(): Promise<SellersReport[]> {
		const reports = await this._client.groupBy({
			by: ['seller'],
			_sum: {
				price: true,
			},
			where: {
				transaction: {
					id: {
						equals: 2,
					},
				},
			},
		});

		const getPayments = await this._client.groupBy({
			by: ['seller'],
			_sum: {
				price: true,
			},
			where: {
				transaction: {
					id: {
						equals: 3,
					},
				},
			},
		});

		const data = reports.reduce((acc, current) => {
			const found = getPayments.find((item) => item.seller === current.seller);
			if (found) {
				acc.push({
					seller: found.seller,
					valueSold:
						(current._sum.price as number) - (found._sum.price as number),
					type: 'affiliate',
				});
			}
			return acc;
		}, [] as SellersReport[]);

		return data as SellersReport[];
	}
}
