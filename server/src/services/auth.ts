import bcrypt from 'bcrypt';
import { Model } from '../interfaces/model';
import { ServiceAuth } from '../interfaces/services';
import { User } from '../interfaces/user';
import { createToken } from '../utils/token';
import { loginSchema, registerSchema } from '../utils/validations';

export default class AuthService implements ServiceAuth {
	constructor(private _model: Model<User>) {}

	public async register(data: unknown) {
		const parsedData = registerSchema.safeParse(data);
		if (!parsedData.success) {
			throw parsedData.error;
		}
		const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
		const created = await this._model.create({
			...parsedData.data,
			password: hashedPassword,
		});
		return {
			...created,
			password: null,
		};
	}

	public async login(data: unknown) {
		const parsedData = loginSchema.safeParse(data);
		if (!parsedData.success) {
			throw parsedData.error;
		}
		const user = await this._model.getById(parsedData.data.email); // email as unique field
		if (!user) {
			throw new Error('User not found');
		}
		const isPasswordValid = await bcrypt.compare(
			parsedData.data.password,
			user.password,
		);
		if (!isPasswordValid) {
			throw new Error('Invalid password');
		}
		const token = createToken({ email: user.email });
		return token;
	}
}
