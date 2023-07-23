import { Router } from 'express';
import { ProductController } from '../controllers/product';
import prisma from '../lib/prisma';
import ProductModel from '../models/product';
import ProductService from '../services/product';

const router = Router();

const model = new ProductModel(prisma);
const service = new ProductService(model);
const controller = new ProductController(service);

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.get('/:id', (req, res) => controller.findById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
