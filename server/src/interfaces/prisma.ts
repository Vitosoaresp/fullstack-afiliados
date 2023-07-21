import prisma from '../lib/prisma';

export type SaleModel = typeof prisma.sale;

export type TypesOfTransactionsModel = typeof prisma.transactionsTypes;
