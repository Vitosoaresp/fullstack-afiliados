import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import TransactionModel from '../../../models/transaction';
import { mockSale, mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Model: Transactions', () => {
	const prisma = {
		transaction: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
		$transaction: async (tx: PrismaClient) => tx,
	} as unknown as PrismaClient;

	const model = new TransactionModel(prisma);
	const FAKE_ID = mockSale.id;

	before(async () => {
		sinon.stub(prisma.transaction, 'create').resolves(mockSale);
		sinon.stub(prisma.transaction, 'findMany').resolves(mockSales);
		sinon
			.stub(prisma.transaction, 'findUnique')
			.onFirstCall()
			.resolves(mockSale)
			.onSecondCall()
			.resolves(null);
		sinon.stub(prisma.transaction, 'update').resolves(mockSale);
		sinon.stub(prisma.transaction, 'delete').resolves(mockSale);
		sinon.stub(prisma, '$transaction').resolves({ count: 1 });
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const product = await model.create(mockSaleDTO);
			expect(product).to.be.deep.equal(mockSale);
		});
	});

	describe('findMany', () => {
		it('successfully', async () => {
			const products = await model.getAll();
			expect(products).to.be.deep.equal(mockSales);
		});
	});

	describe('findUnique', () => {
		it('successfully', async () => {
			const product = await model.getById(FAKE_ID);
			expect(product).to.be.deep.equal(mockSale);
		});

		it('should return null if id is not found', async () => {
			const product = await model.getById('invalid-id');
			expect(product).to.be.null;
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const product = await model.update(FAKE_ID, mockSaleDTO);
			expect(product).to.be.deep.equal(mockSale);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const product = await model.delete(FAKE_ID);
			expect(product).to.be.deep.equal(mockSale);
		});
	});

	describe('createMany', () => {
		it('successfully', async () => {
			const product = await model.createMany([mockSaleDTO]);
			expect(product).to.be.deep.equal({ count: 1 });
		});
	});
});
