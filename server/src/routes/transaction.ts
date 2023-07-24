import { Router } from 'express';
import TransactionController from '../controllers/transaction';
import prisma from '../lib/prisma';
import TransactionModel from '../models/transaction';
import TransactionService from '../services/transaction';

const router = Router();

const model = new TransactionModel(prisma);
const service = new TransactionService(model);
const controller = new TransactionController(service);

router.get('/', (req, res) => controller.findAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.get('/:id', (req, res) => controller.findById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
