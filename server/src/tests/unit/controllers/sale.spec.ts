import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import SaleController from '../../../controllers/sale';
import SaleModel from '../../../models/sale';
import SaleService from '../../../services/sale';
import { mockSale, mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Controller: Sale', () => {
	const prisma = {
		sale: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const req = {} as Request;
	const res = {} as Response;

	const model = new SaleModel(prisma);
	const service = new SaleService(model);
	const controller = new SaleController(service);

	before(async () => {
		stub(service, 'getAll').resolves(mockSales);
		stub(service, 'create').resolves(mockSale);
		stub(service, 'getById').resolves(mockSale);
		stub(service, 'update').resolves(mockSale);
		stub(service, 'delete').resolves(mockSale);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('GET /sales', () => {
		it('success for get all sales', async () => {
			await controller.findAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSales)).to.be.true;
		});
	});

	describe('POST /sales', () => {
		it('success for create new sale', async () => {
			req.body = mockSaleDTO;
			await controller.create(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});

	describe('GET /sales/:id', () => {
		it('success for get sale by id', async () => {
			req.params = { id: mockSale.id };
			await controller.findById(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSales)).to.be.true;
		});
	});

	describe('PUT /sales/:id', () => {
		it('success for update new sale', async () => {
			req.body = mockSaleDTO;
			req.params = { id: mockSale.id };
			await controller.update(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});

	describe('DELETE /sales/:id', () => {
		it('success for delete new sale', async () => {
			req.params = { id: mockSale.id };
			await controller.delete(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});
});
