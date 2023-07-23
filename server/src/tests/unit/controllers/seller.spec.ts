import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import { SellersController } from '../../../controllers/sellers';
import SellerModel from '../../../models/seller';
import SellerService from '../../../services/seller';
import { mockSeller, mockSellerDTO, mockSellers } from '../../mocks/seller';

describe('Controller: Seller', () => {
	const prisma = {
		seller: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const req = {} as Request;
	const res = {} as Response;

	const model = new SellerModel(prisma);
	const service = new SellerService(model);
	const controller = new SellersController(service);

	before(async () => {
		stub(service, 'getAll').resolves(mockSellers);
		stub(service, 'create').resolves(mockSeller);
		stub(service, 'getById').resolves(mockSeller);
		stub(service, 'update').resolves(mockSeller);
		stub(service, 'delete').resolves(mockSeller);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('GET /sellers', () => {
		it('success for get all sellers', async () => {
			await controller.getAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSellers)).to.be.true;
		});
	});

	describe('POST /sellers', () => {
		it('success for create new seller', async () => {
			req.body = mockSellerDTO;
			await controller.create(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSeller)).to.be.true;
		});
	});

	describe('GET /sellers/:id', () => {
		it('success for get seller by id', async () => {
			req.params = { id: mockSeller.id };
			await controller.findById(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSellers)).to.be.true;
		});
	});

	describe('PUT /sellers/:id', () => {
		it('success for update seller', async () => {
			req.body = mockSellerDTO;
			req.params = { id: mockSeller.id };
			await controller.update(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSeller)).to.be.true;
		});
	});

	describe('DELETE /sellers/:id', () => {
		it('success for delete seller', async () => {
			req.params = { id: mockSeller.id };
			await controller.delete(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockSeller)).to.be.true;
		});
	});
});
