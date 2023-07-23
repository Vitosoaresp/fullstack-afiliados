import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './hooks/useSession';

function App() {
	const { email } = useSession();
	const navigate = useNavigate();
	const isAthenticated = !email; // TODO: change this to check if the user is authenticated
	const pathToNavigate = isAthenticated ? '/transactions' : '/login';

	useEffect(() => {
		navigate(pathToNavigate);
	}, [pathToNavigate, navigate, email]);

	return null;
}

export default App;
