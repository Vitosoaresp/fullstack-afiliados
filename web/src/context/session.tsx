/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from 'react';
import { User } from '../types/login';

interface SessionContextType {
	email: string | null;
	setEmail: (email: string) => void;
	setName: (name: string) => void;
	name: string | null;
	logout: () => void;
	setSession: (data: User) => void;
}

interface SessionProviderProps {
	children: React.ReactNode;
}

const SessionContext = createContext<SessionContextType>({
	email: null,
	setEmail: () => {},
	name: null,
	setName: () => {},
	logout: () => {},
	setSession: () => {},
});

export const SessionProvider = ({ children }: SessionProviderProps) => {
	const [email, setEmail] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);

	useEffect(() => {
		const session = localStorage.getItem('session');
		if (session) {
			const { email, name } = JSON.parse(session) as User;
			setEmail(email);
			setName(name);
		}
	}, []);

	const logout = () => {
		setEmail(null);
		setName(null);
		localStorage.removeItem('session');
	};

	const setSession = (data: User) => {
		setEmail(data.email);
		setName(data.name);
		localStorage.setItem('session', JSON.stringify(data));
	};

	return (
		<SessionContext.Provider
			value={{
				email,
				setEmail,
				name,
				setName,
				logout,
				setSession,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

export default SessionContext;
