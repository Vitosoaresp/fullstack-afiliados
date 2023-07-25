import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import TransactionModel from '../../../models/transaction';
import TransactionService from '../../../services/transaction';
import { mockSale, mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Service: Transaction', () => {
	const prisma = {
		transaction: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const model = new TransactionModel(prisma);
	const service = new TransactionService(model);
	const FAKE_ID = mockSale.id;

	before(async () => {
		sinon.stub(model, 'create').resolves(mockSale);
		sinon.stub(model, 'getAll').resolves(mockSales);
		sinon
			.stub(model, 'getById')
			.onFirstCall()
			.resolves(mockSale)
			.onSecondCall()
			.resolves(null);
		sinon.stub(model, 'update').resolves(mockSale);
		sinon.stub(model, 'delete').resolves(mockSale);
		sinon.stub(model, 'createMany').resolves({ count: 1 });
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const sale = await service.create(mockSaleDTO);
			expect(sale).to.be.deep.equal(mockSale);
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.create(null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('getAll', () => {
		it('successfully', async () => {
			const sales = await service.getAll();
			expect(sales).to.be.deep.equal(mockSales);
		});
	});

	describe('getById', () => {
		it('successfully', async () => {
			const sale = await service.getById(FAKE_ID);
			expect(sale).to.be.deep.equal(mockSale);
		});

		it('should return error if id is not found', async () => {
			let error;
			try {
				await service.getById('');
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal('id not found');
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const sale = await service.update(FAKE_ID, mockSaleDTO);
			expect(sale).to.be.deep.equal(mockSale);
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.update(FAKE_ID, null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const sale = await service.delete(FAKE_ID);
			expect(sale).to.be.deep.equal(mockSale);
		});
	});

	describe('create many', () => {
		it('successfully', async () => {
			const sale = await service.createMany([
				{
					...mockSaleDTO,
					date: mockSaleDTO.date.toISOString() as any,
				},
			]);
			expect(sale).to.be.deep.equal({ count: 1 });
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.createMany([mockSaleDTO]);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});
});
