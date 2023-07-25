import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { restore, stub } from 'sinon';

import Authentication from '../../../controllers/authentication';
import { UserModel } from '../../../models/user';
import AuthService from '../../../services/auth';
import { mockUser, mockUserWithoutPassword } from '../../mocks/user';

describe('Controller: Auth', () => {
	const prisma = {
		user: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const req = {} as Request;
	const res = {} as Response;

	const model = new UserModel(prisma);
	const service = new AuthService(model);
	const controller = new Authentication(service);
	const FAKE_TOKEN = 'kaokdoskaodk';

	before(async () => {
		stub(service, 'register').resolves(mockUserWithoutPassword);
		stub(service, 'login').resolves(FAKE_TOKEN);

		res.status = stub().returns(res);
		res.json = stub().returns(res);
	});

	after(() => {
		restore();
	});

	describe('POST /auth/register', () => {
		it('success', async () => {
			req.body = mockUser;
			await controller.register(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(mockUserWithoutPassword))
				.to.be.true;
		});
	});

	describe('POST /auth/login', () => {
		it('success', async () => {
			req.body = mockUser;
			await controller.login(req, res);
			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith({ token: FAKE_TOKEN }));
		});
	});
});
