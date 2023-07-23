import { z } from 'zod';

export const saleSchema = z.object({
	productId: z.string(),
	price: z.number(),
	sellerId: z.string(),
	date: z.date(),
	typeId: z.number(),
});

export const salesSchema = z.array(
	z.object({
		productId: z.string(),
		price: z.number(),
		sellerId: z.string(),
		date: z.date(),
		typeId: z.number(),
	}),
);

export const sellerSchema = z.object({
	name: z.string(),
	type: z.string(),
});
