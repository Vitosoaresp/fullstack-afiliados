import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import { UserModel } from '../../../models/user';
import { mockUser, mockUserDTO, mockUsers } from '../../mocks/user';

describe('Model: User', () => {
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
	const FAKE_ID = mockUser.id;

	before(async () => {
		sinon.stub(prisma.user, 'create').resolves(mockUser);
		sinon.stub(prisma.user, 'findMany').resolves(mockUsers);
		sinon
			.stub(prisma.user, 'findUnique')
			.onFirstCall()
			.resolves(mockUser)
			.onSecondCall()
			.resolves(null);
		sinon.stub(prisma.user, 'update').resolves(mockUser);
		sinon.stub(prisma.user, 'delete').resolves(mockUser);
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const user = await model.create(mockUserDTO);
			expect(user).to.be.deep.equal(mockUser);
		});
	});

	describe('findMany', () => {
		it('successfully', async () => {
			const user = await model.getAll();
			expect(user).to.be.deep.equal(mockUsers);
		});
	});

	describe('findUnique', () => {
		it('successfully', async () => {
			const user = await model.getById(FAKE_ID);
			expect(user).to.be.deep.equal(mockUser);
		});

		it('should return null if id is not found', async () => {
			const user = await model.getById('invalid-id');
			expect(user).to.be.null;
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const user = await model.update(FAKE_ID, mockUser);
			expect(user).to.be.deep.equal(mockUser);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const user = await model.delete(FAKE_ID);
			expect(user).to.be.deep.equal(mockUser);
		});
	});
});
