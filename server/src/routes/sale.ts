import { Router } from 'express';
import SaleController from '../controllers/sale';
import UploadFileController from '../controllers/upload-file';
import prisma from '../lib/prisma';
import SaleModel from '../models/sale';
import SaleService from '../services/sale';
import UploadFileService from '../services/updload-file';

const router = Router();

const saleModel = new SaleModel(prisma);
const saleService = new SaleService(saleModel);
const saleController = new SaleController(saleService);
const uploadService = new UploadFileService(prisma);
const uploadController = new UploadFileController(uploadService);

router.get('/', (req, res) => saleController.findAll(req, res));
router.post('/', (req, res) => saleController.create(req, res));
router.get('/:id', (req, res) => saleController.findById(req, res));
router.put('/:id', (req, res) => saleController.update(req, res));
router.delete('/:id', (req, res) => saleController.delete(req, res));
router.post('/file', (req, res) => uploadController.createMany(req, res));

export default router;
