import { z } from 'zod';

export const transactionSchema = z.object({
	product: z.string(),
	price: z.number(),
	seller: z.string(),
	date: z.date(),
	typeId: z.number(),
});

export const transactionsSchema = z.array(
	z.object({
		product: z.string(),
		price: z.number(),
		seller: z.string(),
		date: z.string(),
		typeId: z.number(),
	}),
);

export const sellerSchema = z.object({
	name: z.string(),
	type: z.string(),
});

export const productSchema = z.object({
	name: z.string(),
});

export const registerSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
