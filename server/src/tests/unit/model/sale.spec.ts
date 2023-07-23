import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import SaleModel from '../../../models/sale';
import { mockSale, mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Model: Sale', () => {
	const prisma = {
		sale: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const model = new SaleModel(prisma);
	const FAKE_ID = mockSale.id;

	before(async () => {
		sinon.stub(prisma.sale, 'create').resolves(mockSale);
		sinon.stub(prisma.sale, 'findMany').resolves(mockSales);
		sinon
			.stub(prisma.sale, 'findUnique')
			.onFirstCall()
			.resolves(mockSale)
			.onSecondCall()
			.resolves(null);
		sinon.stub(prisma.sale, 'update').resolves(mockSale);
		sinon.stub(prisma.sale, 'delete').resolves(mockSale);
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
});
