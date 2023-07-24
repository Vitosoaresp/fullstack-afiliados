import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TYPE_ONE = {
	id: 1,
	description: 'Venda produtor',
	natureOfTransaction: 'Entrada',
};

const TYPE_TWO = {
	id: 2,
	description: 'Venda afiliado',
	natureOfTransaction: 'Entrada',
};

const TYPE_THREE = {
	id: 3,
	description: 'Comissão paga',
	natureOfTransaction: 'saída',
};

const TYPE_FOUR = {
	id: 4,
	description: 'Comissão recebida',
	natureOfTransaction: 'Entrada',
};

async function run() {
	await prisma.transactionsTypes.deleteMany();
	await prisma.transaction.deleteMany();
	await prisma.user.deleteMany();
	await prisma.product.deleteMany();
	await prisma.seller.deleteMany();

	await Promise.all([
		prisma.transactionsTypes.create({ data: TYPE_ONE }),
		prisma.transactionsTypes.create({ data: TYPE_TWO }),
		prisma.transactionsTypes.create({ data: TYPE_THREE }),
		prisma.transactionsTypes.create({ data: TYPE_FOUR }),
	]);
}

run()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
