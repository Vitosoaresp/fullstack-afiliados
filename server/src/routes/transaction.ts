import { Router } from 'express';
import TransactionController from '../controllers/transaction';
import UploadFileController from '../controllers/upload-file';
import prisma from '../lib/prisma';
import TransactionModel from '../models/transaction';
import TransactionService from '../services/transaction';
import UploadFileService from '../services/updload-file';

const router = Router();

const model = new TransactionModel(prisma);
const service = new TransactionService(model);
const controller = new TransactionController(service);
const uploadService = new UploadFileService(prisma);
const uploadController = new UploadFileController(uploadService);

router.get('/', (req, res) => controller.findAll(req, res));
router.post('/file', (req, res) => uploadController.createMany(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.get('/:id', (req, res) => controller.findById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
