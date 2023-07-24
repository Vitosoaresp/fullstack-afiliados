/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from 'react';
import { User } from '../types/login';

interface SessionContextType {
	token: string | null;
	logout: () => void;
	name: string | null;
	setSession: (data: User) => void;
}

interface SessionProviderProps {
	children: React.ReactNode;
}

const SessionContext = createContext<SessionContextType>({
	token: null,
	name: null,
	logout: () => {},
	setSession: () => {},
});

export const SessionProvider = ({ children }: SessionProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);

	useEffect(() => {
		const session = localStorage.getItem('session');
		if (session) {
			const { token, name } = JSON.parse(session) as User;
			setToken(token);
			setName(name || null);
		}
	}, []);

	const logout = () => {
		setToken(null);
		setName(null);
		localStorage.removeItem('session');
	};

	const setSession = (data: User) => {
		setToken(data.token);
		setName(data.name || null);
		localStorage.setItem('session', JSON.stringify(data));
	};

	return (
		<SessionContext.Provider
			value={{
				token,
				name,
				logout,
				setSession,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

export default SessionContext;
