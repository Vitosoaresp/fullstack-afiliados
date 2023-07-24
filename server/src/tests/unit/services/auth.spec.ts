import bycrpt from 'bcrypt';
import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { UserModel } from '../../../models/user';
import AuthService from '../../../services/auth';
import {
	mockUser,
	mockUserDTO,
	mockUserWithoutPassword,
} from '../../mocks/user';

describe('Auth Service', () => {
	const prisma = {
		user: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const model = new UserModel(prisma);
	const service = new AuthService(model);
	const FAKE_ID = mockUser.id;

	before(async () => {
		sinon.stub(model, 'create').resolves(mockUser);
		sinon
			.stub(model, 'getById')
			.onFirstCall()
			.resolves(mockUser)
			.onSecondCall()
			.resolves(null)
			.onThirdCall()
			.resolves(mockUser);
		sinon.stub(bycrpt, 'compare').onFirstCall().resolves(true);
	});

	after(() => {
		sinon.restore();
	});

	describe('register', () => {
		it('should return a user', async () => {
			const user = await service.register(mockUserDTO);
			expect(user).to.be.deep.equal(mockUserWithoutPassword);
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.register(null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('login', () => {
		it('should return a token', async () => {
			const token = await service.login(mockUserDTO);
			expect(token).to.be.a('string');
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.login(null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});

		it('should return error if user not found', async () => {
			let error;
			try {
				await service.login(mockUserDTO);
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal('User not found');
		});

		it('should return error if password is invalid', async () => {
			let error;
			try {
				await service.login(mockUserDTO);
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal('Invalid password');
		});
	});
});
