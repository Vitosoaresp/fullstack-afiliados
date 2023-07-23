export enum ErrorTypes {
	NOT_FOUND = 'id not found',
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
};
