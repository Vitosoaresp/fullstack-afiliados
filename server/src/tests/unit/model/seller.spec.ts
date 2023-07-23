import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import SellerModel from '../../../models/seller';
import { mockSeller, mockSellerDTO, mockSellers } from '../../mocks/seller';

describe('Model: Seller', () => {
	const prisma = {
		seller: {
			create: () => {},
			findMany: () => {},
			findUnique: () => {},
			update: () => {},
			delete: () => {},
		},
	} as unknown as PrismaClient;

	const model = new SellerModel(prisma);
	const FAKE_ID = mockSeller.id;

	before(async () => {
		sinon.stub(prisma.seller, 'create').resolves(mockSeller);
		sinon.stub(prisma.seller, 'findMany').resolves(mockSellers);
		sinon
			.stub(prisma.seller, 'findUnique')
			.onFirstCall()
			.resolves(mockSeller)
			.onSecondCall()
			.resolves(null);
		sinon.stub(prisma.seller, 'update').resolves(mockSeller);
		sinon.stub(prisma.seller, 'delete').resolves(mockSeller);
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const seller = await model.create(mockSellerDTO);
			expect(seller).to.be.deep.equal(mockSeller);
		});
	});

	describe('findMany', () => {
		it('successfully', async () => {
			const sellers = await model.getAll();
			expect(sellers).to.be.deep.equal(mockSellers);
		});
	});

	describe('findUnique', () => {
		it('successfully', async () => {
			const seller = await model.getById(FAKE_ID);
			expect(seller).to.be.deep.equal(mockSeller);
		});

		it('should return null if id is not found', async () => {
			const seller = await model.getById('invalid-id');
			expect(seller).to.be.null;
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const seller = await model.update(FAKE_ID, mockSeller);
			expect(seller).to.be.deep.equal(mockSeller);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const seller = await model.delete(FAKE_ID);
			expect(seller).to.be.deep.equal(mockSeller);
		});
	});
});
