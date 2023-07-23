import { Router } from 'express';
import SaleController from '../controllers/sale';
import prisma from '../lib/prisma';
import SaleModel from '../models/sale';
import SaleService from '../services/sale';

const router = Router();

const saleModel = new SaleModel(prisma);
const saleService = new SaleService(saleModel);
const saleController = new SaleController(saleService);
// const transactionsTypesService = new TypesOfTransactions(transactionsTypes);
// const transactionsTypesController = new TransactionsTypesController(
// 	transactionsTypesService,
// );

router.get('/', (req, res) => saleController.findAll(req, res));
router.post('/', (req, res) => saleController.create(req, res));
router.get('/:id', (req, res) => saleController.findById(req, res));
router.put('/:id', (req, res) => saleController.update(req, res));
router.delete('/:id', (req, res) => saleController.delete(req, res));
// router.get('/transactions-types', (req, res) =>
// 	transactionsTypesController.findAll(req, res),
// );

export default router;
