import { expect } from 'chai';
import sinon from 'sinon';

import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import SellerModel from '../../../models/seller';
import SellerService from '../../../services/seller';
import { mockSeller, mockSellerDTO, mockSellers } from '../../mocks/seller';

describe('Service: Seller', () => {
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
	const service = new SellerService(model);
	const FAKE_ID = mockSeller.id;

	before(async () => {
		sinon.stub(model, 'create').resolves(mockSeller);
		sinon.stub(model, 'getAll').resolves(mockSellers);
		sinon
			.stub(model, 'getById')
			.onFirstCall()
			.resolves(mockSeller)
			.onSecondCall()
			.resolves(null);
		sinon.stub(model, 'update').resolves(mockSeller);
		sinon.stub(model, 'delete').resolves(mockSeller);
	});

	after(() => {
		sinon.restore();
	});

	describe('create', () => {
		it('successfully created', async () => {
			const seller = await service.create(mockSellerDTO);
			expect(seller).to.be.deep.equal(mockSeller);
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.create(null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('findMany', () => {
		it('successfully', async () => {
			const sellers = await service.getAll();
			expect(sellers).to.be.deep.equal(mockSellers);
		});
	});

	describe('findUnique', () => {
		it('successfully', async () => {
			const seller = await service.getById(FAKE_ID);
			expect(seller).to.be.deep.equal(mockSeller);
		});

		it('should return error if id is not found', async () => {
			let error;
			try {
				await service.getById('');
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal('id not found');
		});
	});

	describe('update', () => {
		it('successfully', async () => {
			const seller = await service.update(FAKE_ID, mockSeller);
			expect(seller).to.be.deep.equal(mockSeller);
		});

		it('should return error if body is invalid', async () => {
			let error;
			try {
				await service.update(FAKE_ID, null);
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('delete', () => {
		it('successfully delete', async () => {
			const seller = await service.delete(FAKE_ID);
			expect(seller).to.be.deep.equal(mockSeller);
		});
	});
});
