import { Router } from 'express';
import SaleController from '../controllers/sale';
import TransactionsTypesController from '../controllers/types-of-transactions';
import prisma from '../lib/prisma';
import SaleService from '../services/sale';
import TypesOfTransactions from '../services/types-of-transactions';

const router = Router();
const { sale, transactionsTypes } = prisma;

const saleService = new SaleService(sale);
const saleController = new SaleController(saleService);
const transactionsTypesService = new TypesOfTransactions(transactionsTypes);
const transactionsTypesController = new TransactionsTypesController(
	transactionsTypesService,
);

router.get('/', (req, res) => saleController.findAll(req, res));
router.post('/', (req, res) => saleController.create(req, res));
router.get('/transactions-types', (req, res) =>
	transactionsTypesController.findAll(req, res),
);

export default router;
