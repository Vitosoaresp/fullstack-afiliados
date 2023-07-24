export const mockUsers = [
	{
		id: '1231jidajis',
		email: 'example@gmail.com',
		password: 'ajdsajdasd',
		name: 'John Doe',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const mockUserDTO = {
	email: 'example@gmail.com',
	password: 'ajdsajdasd',
	name: 'John Doe',
};

export const mockUser = mockUsers[0];
export const mockUserWithoutPassword = {
	...mockUser,
	password: null,
};
