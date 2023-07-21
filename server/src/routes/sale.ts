import { Router } from 'express';
import TransactionsTypesController from '../controllers/types-of-transactions';
import prisma from '../lib/prisma';
import TypesOfTransactions from '../services/types-of-transactions';

const router = Router();

const transactionsTypesService = new TypesOfTransactions(
	prisma.transactionsTypes,
);
const transactionsTypesController = new TransactionsTypesController(
	transactionsTypesService,
);

router.get('/transactions-types', (req, res) =>
	transactionsTypesController.findAll(req, res),
);

export default router;
