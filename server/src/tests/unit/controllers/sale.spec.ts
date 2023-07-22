import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import SaleController from '../../../controllers/sale';
import SaleService from '../../../services/sale';
import { mockSaleDTO, mockSales } from '../../mocks/sales';

describe('Controller: Sale', () => {
	const client = {
		findMany: () => {},
		create: () => {},
	} as unknown as Prisma.SaleDelegate<DefaultArgs>;

	const req = {} as Request;
	const res = {} as Response;

	const service = new SaleService(client);
	const controller = new SaleController(service);

	before(async () => {
		stub(client, 'findMany').resolves(mockSales);
		stub(client, 'create').resolves(mockSales[0]);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('get all Sales', () => {
		it('success', async () => {
			await controller.findAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSales)).to.be.true;
		});
	});

	describe('create a new Sale', () => {
		it('success', async () => {
			req.body = mockSaleDTO;
			await controller.create(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSales[0])).to.be.true;
		});
	});
});
