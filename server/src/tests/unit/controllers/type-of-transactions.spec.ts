import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';
import TransactionsTypesController from '../../../controllers/types-of-transactions';
import TypesOfTransactions from '../../../services/types-of-transactions';
import { mockTypesOfTransactions } from '../../mocks/sales';

describe('Controller: TypeOfTransactions', () => {
	const client = {
		findMany: () => {},
		create: () => {},
	} as unknown as Prisma.TransactionsTypesDelegate<DefaultArgs>;

	const req = {} as Request;
	const res = {} as Response;

	const service = new TypesOfTransactions(client);
	const controller = new TransactionsTypesController(service);

	before(async () => {
		stub(client, 'findMany').resolves(mockTypesOfTransactions);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('get all', () => {
		it('success', async () => {
			await controller.findAll(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockTypesOfTransactions))
				.to.be.true;
		});
	});
});
