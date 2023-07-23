import { Router } from 'express';
import { SellersController } from '../controllers/sellers';
import prisma from '../lib/prisma';
import SellerModel from '../models/seller';
import SellersService from '../services/seller';

const router = Router();

const model = new SellerModel(prisma);
const service = new SellersService(model);
const controller = new SellersController(service);

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));

export default router;
