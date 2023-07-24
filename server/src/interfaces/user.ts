export interface UserDTO {
	email: string;
	name: string;
	password: string;
}

export interface User extends UserDTO {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}
