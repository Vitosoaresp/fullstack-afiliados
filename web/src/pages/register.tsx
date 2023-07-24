import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import RegisterForm from '../components/RegisterForm';
import SpinLoading from '../components/SpinLoading';
import { api } from '../lib/api';
import { SubmitLogin } from '../types/login';

export function Register() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const navigate = useNavigate();

	const onSubmit = async (data: SubmitLogin) => {
		setIsLoading(true);
		try {
			await api.post('/register', data);
			navigate('/login');
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
					message='Error ao cadastrar usuário'
					open={error}
					onClose={() => setError(false)}
				/>
			)}

			<RegisterForm onSubmit={onSubmit} />

			{isLoading && <SpinLoading />}
		</Box>
	);
}
