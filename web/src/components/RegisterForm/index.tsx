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
import { SubmitRegister } from '../../types/login';
import { submitRegisterSchema } from '../../utils/validations';

interface RegisterFormProps {
	onSubmit: (data: SubmitRegister) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
		shouldFocusError: true,
		resolver: zodResolver(submitRegisterSchema),
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
						Faça seu cadastro
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
							<TextField fullWidth label='nome' {...register('name')} />
							{errors.name && (
								<Typography color='red' variant='caption'>
									{errors.name.message}
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
								Criar
							</Button>
						</Grid>
					</Grid>

					<Grid item mt={2}>
						<Typography component='span'>Já tem um cadastro?</Typography>
						<Link href='/register'>
							<Typography component='span'> faça seu login</Typography>
						</Link>
						<Typography component='span'> aqui.</Typography>
					</Grid>
				</form>
			</Paper>
		</Box>
	);
}
