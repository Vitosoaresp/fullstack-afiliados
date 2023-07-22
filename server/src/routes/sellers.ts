import { Router } from 'express';
import { SellersController } from '../controllers/sellers';
import prisma from '../lib/prisma';
import SellersService from '../services/sellers';

const router = Router();

const sellersService = new SellersService(prisma.sale);
const sellerControler = new SellersController(sellersService);

router.get('/producers', (req, res) => sellerControler.getProducers(req, res));
router.get('/affiliates', (req, res) =>
	sellerControler.getAffiliates(req, res),
);

export default router;
