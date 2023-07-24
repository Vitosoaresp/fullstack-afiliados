import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import LoginForm from '../components/LoginForm';
import SpinLoading from '../components/SpinLoading';
import { useSession } from '../hooks/useSession';
import { api } from '../lib/api';
import { LoginResponse, SubmitLogin } from '../types/login';

export function Login() {
	const { setSession } = useSession();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const navigate = useNavigate();

	const onSubmit = async (data: SubmitLogin) => {
		setIsLoading(true);
		try {
			const { data: response } = await api.post<LoginResponse>('/login', data);
			setSession(response);

			navigate('/transactions');
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box width='100%'>
			{error && (
				<Alert
					type='error'
					message='Usuário ou senha inválidos'
					open={error}
					onClose={() => setError(false)}
				/>
			)}
			<LoginForm onSubmit={onSubmit} />
			{isLoading && <SpinLoading />}
		</Box>
	);
}
