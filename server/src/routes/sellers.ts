import { Router } from 'express';
import { SellersController } from '../controllers/sellers';
import prisma from '../lib/prisma';
import SellerModel from '../models/seller';
import SellersService from '../services/seller';

const router = Router();

const model = new SellerModel(prisma);
const service = new SellersService(model);
const controller = new SellersController(service);

router.get('/producers', (req, res) => controller.getProducers(req, res));
router.get('/affiliates', (req, res) => controller.getAffiliates(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.get('/:id', (req, res) => controller.findById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
