import { PrismaClient } from '@prisma/client';
import { Model } from '../interfaces/model';
import { User, UserDTO } from '../interfaces/user';

export class UserModel implements Model<User> {
	constructor(private _prisma: PrismaClient) {}

	getAll(): Promise<User[]> {
		return this._prisma.user.findMany();
	}
	getById(email: string): Promise<User | null> {
		return this._prisma.user.findUnique({ where: { email } });
	}
	create(data: UserDTO): Promise<User> {
		return this._prisma.user.create({
			data,
		});
	}
	update(id: string, data: User): Promise<User> {
		return this._prisma.user.update({
			where: { id },
			data,
		});
	}
	delete(id: string): Promise<User> {
		return this._prisma.user.delete({ where: { id } });
	}
}
