import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
	err: Error | ZodError,
	_req,
	res: Response,
	_next,
) => {
	if (err instanceof ZodError) {
		return res.status(400).json({ message: err.issues });
	}

	return res.status(500).json({ message: 'Internal Error' });
};
