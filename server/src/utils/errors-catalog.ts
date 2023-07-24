export enum ErrorTypes {
	NOT_FOUND = 'id not found',
	USER_NOT_FOUND = 'User not found',
	INVALID_PASSWORD = 'Invalid password',
}

export type ErrorResponse = {
	message: string;
	status: number;
};

export type ErrorCatalog = {
	[key in ErrorTypes]: ErrorResponse;
};

export const errorsCatalog: ErrorCatalog = {
	[ErrorTypes.NOT_FOUND]: {
		message: 'id not found',
		status: 404,
	},
	[ErrorTypes.USER_NOT_FOUND]: {
		message: 'User not found',
		status: 404,
	},
	[ErrorTypes.INVALID_PASSWORD]: {
		message: 'Invalid password',
		status: 400,
	},
};
