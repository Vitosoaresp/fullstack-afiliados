import jwt from 'jsonwebtoken';

interface JWTPayload {
	email: string;
}

const secret = process.env.JWT_SECRET as string;

export const createToken = (data: JWTPayload) => {
	const token = jwt.sign(data, secret);
	return token;
};

export const verifyToken = (token: string) => {
	const check = jwt.verify(token, secret);
	return check;
};
