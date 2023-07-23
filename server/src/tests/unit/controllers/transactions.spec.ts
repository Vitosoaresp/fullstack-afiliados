import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import Controller from '../../../controllers/transaction';
import Model from '../../../models/transaction';
import Service from '../../../services/transaction';
import { mockSale, mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Controller: Transaction', () => {
	const prisma = {
		transaction: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const req = {} as Request;
	const res = {} as Response;

	const model = new Model(prisma);
	const service = new Service(model);
	const controller = new Controller(service);

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

	describe('GET /transactions', () => {
		it('success for get all transactions', async () => {
			await controller.findAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSales)).to.be.true;
		});
	});

	describe('POST /transactions', () => {
		it('success for create new transaction', async () => {
			req.body = mockSaleDTO;
			await controller.create(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});

	describe('GET /transactions/:id', () => {
		it('success for get transaction by id', async () => {
			req.params = { id: mockSale.id };
			await controller.findById(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});

	describe('PUT /transactions/:id', () => {
		it('success for update new transaction', async () => {
			req.body = mockSaleDTO;
			req.params = { id: mockSale.id };
			await controller.update(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});

	describe('DELETE /transactions/:id', () => {
		it('success for delete new transaction', async () => {
			req.params = { id: mockSale.id };
			await controller.delete(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSale)).to.be.true;
		});
	});
});
