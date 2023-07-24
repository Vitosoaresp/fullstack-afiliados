import { Router } from 'express';
import Controller from '../controllers/authentication';
import prisma from '../lib/prisma';
import { UserModel } from '../models/user';
import Service from '../services/auth';

const model = new UserModel(prisma);
const service = new Service(model);
const controller = new Controller(service);

const router = Router();

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));

export default router;
