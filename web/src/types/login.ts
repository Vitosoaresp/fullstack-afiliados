export interface User {
	token: string;
	name?: string;
}

export interface SubmitLogin {
	email: string;
	password: string;
}

export interface SubmitRegister extends SubmitLogin {
	name: string;
}

export interface LoginResponse {
	token: string;
}
