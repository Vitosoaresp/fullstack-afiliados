import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import * as sinon from 'sinon';
import prisma from '../../../lib/prisma';
import TypesOfTransactions from '../../../services/types-of-transactions';
import { mockTypesOfTransactions } from '../../mocks/sales';

describe('Services: TypeOfTransactions', () => {
	sinon.stub(prisma, 'transactionsTypes');
	const client = {
		findMany: () => {},
	} as Prisma.TransactionsTypesDelegate<DefaultArgs>;

	before(async () => {
		sinon.stub(client, 'findMany').resolves(mockTypesOfTransactions);
	});

	after(() => {
		sinon.restore();
	});

	const typeOfTransactionsService = new TypesOfTransactions(client);

	describe('findAll', () => {
		it('should return a list of types of transactions', async () => {
			const result = await typeOfTransactionsService.findAll();
			expect(result).to.be.an('array');
			expect(result).to.have.length(mockTypesOfTransactions.length);
			result.forEach((TypeOfTransaction) => {
				expect(TypeOfTransaction).to.have.property('id');
				expect(TypeOfTransaction).to.have.property('name');
				expect(TypeOfTransaction).to.have.property('natureOfTransaction');
			});
		});
	});
});
