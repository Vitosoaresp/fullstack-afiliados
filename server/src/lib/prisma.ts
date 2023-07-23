import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Client = typeof prisma;

export default prisma;
