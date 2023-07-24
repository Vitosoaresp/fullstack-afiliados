import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { SubmitLogin } from '../../types/login';
import { submitLoginSchema } from '../../utils/validations';

interface LoginFormProps {
	onSubmit: (data: SubmitLogin) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		shouldFocusError: true,
		resolver: zodResolver(submitLoginSchema),
	});

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				my: 'auto',
				alignItems: 'center',
				height: '80vh',
			}}
		>
			<Paper variant='outlined' sx={{ p: 8 }}>
				<Box>
					<Typography variant='h2' textAlign='center' fontWeight={500} mb={5}>
						Faça seu login
					</Typography>
				</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container direction='column' spacing={3}>
						<Grid item xs={12}>
							<TextField fullWidth label='e-mail' {...register('email')} />
							{errors.email && (
								<Typography color='red' variant='caption'>
									{errors.email.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='password'
								fullWidth
								label='senha'
								{...register('password')}
							/>
							{errors.password && (
								<Typography color='red' variant='caption'>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
							>
								Entrar
							</Button>
						</Grid>
					</Grid>

					<Grid item mt={2}>
						<Typography component='span'>Não tem um login?</Typography>
						<Link href='/register'>
							<Typography component='span'> registre-se</Typography>
						</Link>
						<Typography component='span'> aqui.</Typography>
					</Grid>
				</form>
			</Paper>
		</Box>
	);
}
