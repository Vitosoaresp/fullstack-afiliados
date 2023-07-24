import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './hooks/useSession';

function App() {
	const { token } = useSession();
	const navigate = useNavigate();
	const isAthenticated = !!token;
	const pathToNavigate = isAthenticated ? '/transactions' : '/login';

	useEffect(() => {
		navigate(pathToNavigate);
	}, [pathToNavigate, navigate, token]);

	return null;
}

export default App;
