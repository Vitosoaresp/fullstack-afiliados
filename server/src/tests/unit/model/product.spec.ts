import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import ProductModel from '../../../models/product';
import { mockProduct, mockProductDTO, mockProducts } from '../../mocks/product';

describe('Model: Product', () => {
	const prisma = {
		product: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const model = new ProductModel(prisma);
	const FAKE_ID = mockProduct.id;

	before(async () => {
		sinon.stub(prisma.product, 'create').resolves(mockProduct);
		sinon.stub(prisma.product, 'findMany').resolves(mockProducts);
		sinon
			.stub(prisma.product, 'findUnique')
			.onFirstCall()
			.resolves(mockProduct)
			.onSecondCall()
			.resolves(null);
		sinon.stub(prisma.product, 'update').resolves(mockProduct);
		sinon.stub(prisma.product, 'delete').resolves(mockProduct);
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const product = await model.create(mockProductDTO);
			expect(product).to.be.deep.equal(mockProduct);
		});
	});

	describe('findMany', () => {
		it('successfully', async () => {
			const products = await model.getAll();
			expect(products).to.be.deep.equal(mockProducts);
		});
	});

	describe('findUnique', () => {
		it('successfully', async () => {
			const product = await model.getById(FAKE_ID);
			expect(product).to.be.deep.equal(mockProduct);
		});

		it('should return null if id is not found', async () => {
			const product = await model.getById('invalid-id');
			expect(product).to.be.null;
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const product = await model.update(FAKE_ID, mockProduct);
			expect(product).to.be.deep.equal(mockProduct);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const product = await model.delete(FAKE_ID);
			expect(product).to.be.deep.equal(mockProduct);
		});
	});
});
