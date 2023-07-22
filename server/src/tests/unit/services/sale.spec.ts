import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import SaleService from '../../../services/sale';
import { mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Services: Sale', () => {
	const client = {
		findMany: () => {},
		create: () => {},
	} as unknown as Prisma.SaleDelegate<DefaultArgs>;
	const saleService = new SaleService(client);
	before(async () => {
		sinon.stub(client, 'findMany').resolves(mockSales);
		sinon.stub(client, 'create').resolves(mockSales[0]);
	});

	after(() => {
		sinon.restore();
	});

	describe('findAll', () => {
		it('should return a list of sales', async () => {
			const result = await saleService.findAll();
			expect(result).to.be.an('array');
			expect(result).to.have.length(mockSales.length);
			result.forEach((sale) => {
				expect(sale).to.have.property('id');
				expect(sale).to.have.property('product');
				expect(sale).to.have.property('typeId');
				expect(sale).to.have.property('price');
				expect(sale).to.have.property('seller');
			});
		});
	});

	describe('create', () => {
		it('should create a sale', async () => {
			const result = await saleService.create(mockSaleDTO);
			expect(result).to.be.deep.equal(mockSales[0]);
		});

		it('should throw an error if body is invalid ', async () => {
			sinon.restore();
			let error;
			try {
				await saleService.create({});
			} catch (err) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});
});
