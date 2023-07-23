import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { errorsCatalog } from '../utils/errors-catalog';

export const errorHandler: ErrorRequestHandler = (
	err: Error | ZodError,
	_req,
	res: Response,
	_next,
) => {
	if (err instanceof ZodError) {
		return res.status(400).json({ message: err.issues });
	}

	const message = err.message as keyof typeof errorsCatalog;
	const mappedError = errorsCatalog[message];
	if (mappedError) {
		const { status, message } = mappedError;
		return res.status(status).json({ error: message });
	}
	return res.status(500).json({ message: 'Internal Error' });
};
