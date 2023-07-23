import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import { ProductController } from '../../../controllers/product';
import ProductModel from '../../../models/product';
import ProductService from '../../../services/product';
import { mockProduct, mockProductDTO, mockProducts } from '../../mocks/product';

describe('Controller: Product', () => {
	const prisma = {
		product: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const req = {} as Request;
	const res = {} as Response;

	const model = new ProductModel(prisma);
	const service = new ProductService(model);
	const controller = new ProductController(service);

	before(async () => {
		stub(service, 'getAll').resolves(mockProducts);
		stub(service, 'create').resolves(mockProduct);
		stub(service, 'getById').resolves(mockProduct);
		stub(service, 'update').resolves(mockProduct);
		stub(service, 'delete').resolves(mockProduct);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('GET /products', () => {
		it('success for get all products', async () => {
			await controller.getAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockProducts)).to.be.true;
		});
	});

	describe('POST /products', () => {
		it('success for create new product', async () => {
			req.body = mockProductDTO;
			await controller.create(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockProduct)).to.be.true;
		});
	});

	describe('GET /products/:id', () => {
		it('success for get product by id', async () => {
			req.params = { id: mockProduct.id };
			await controller.findById(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockProducts)).to.be.true;
		});
	});

	describe('PUT /products/:id', () => {
		it('success for update product', async () => {
			req.body = mockProductDTO;
			req.params = { id: mockProduct.id };
			await controller.update(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockProduct)).to.be.true;
		});
	});

	describe('DELETE /products/:id', () => {
		it('success for delete product', async () => {
			req.params = { id: mockProduct.id };
			await controller.delete(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockProduct)).to.be.true;
		});
	});
});
