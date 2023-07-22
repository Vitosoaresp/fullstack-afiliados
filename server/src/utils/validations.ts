import { z } from 'zod';

export const saleSchema = z.array(
	z.object({
		product: z.string(),
		price: z.number(),
		seller: z.string(),
		date: z.date(),
		typeId: z.number(),
	}),
);
