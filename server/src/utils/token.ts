import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface JWTPayload {
	email: string;
}

const secret = process.env.JWT_SECRET as string;

export const createToken = (data: JWTPayload) => {
	const token = jwt.sign(data, secret);
	return token;
};
