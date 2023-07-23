import { useContext } from 'react';
import SessionContext from '../context/session';

export const useSession = () => {
	const context = useContext(SessionContext);
	return context;
};
