import { z } from 'zod';

export const submitLoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(3, 'Password must be at least 3 characters long')
		.max(100, 'Password must be at most 100 characters long'),
});

export const submitRegisterSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(3, 'Password must be at least 3 characters long')
		.max(100, 'Password must be at most 100 characters long'),
	name: z.string().min(3, 'Name must be at least 3 characters long'),
});
