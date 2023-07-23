import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import ProductModel from '../../../models/product';
import ProductService from '../../../services/product';
import { mockProduct, mockProductDTO, mockProducts } from '../../mocks/product';

describe('Service: Product', () => {
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
	const service = new ProductService(model);
	const FAKE_ID = mockProduct.id;

	before(async () => {
		sinon.stub(model, 'create').resolves(mockProduct);
		sinon.stub(model, 'getAll').resolves(mockProducts);
		sinon
			.stub(model, 'getById')
			.onFirstCall()
			.resolves(mockProduct)
			.onSecondCall()
			.resolves(null);
		sinon.stub(model, 'update').resolves(mockProduct);
		sinon.stub(model, 'delete').resolves(mockProduct);
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const product = await service.create(mockProductDTO);
			expect(product).to.be.deep.equal(mockProduct);
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
			const products = await service.getAll();
			expect(products).to.be.deep.equal(mockProducts);
		});
	});

	describe('getById', () => {
		it('successfully', async () => {
			const product = await service.getById(FAKE_ID);
			expect(product).to.be.deep.equal(mockProduct);
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
			const product = await service.update(FAKE_ID, mockProduct);
			expect(product).to.be.deep.equal(mockProduct);
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
			const product = await service.delete(FAKE_ID);
			expect(product).to.be.deep.equal(mockProduct);
		});
	});
});
