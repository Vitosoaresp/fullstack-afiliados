import {
	Box,
	Button,
	Container,
	Link as MuiLink,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSession } from '../../hooks/useSession';
import { DialogForm } from '../DialogForm';
import { StyledHeader, StyledNavigation } from './styles';

export function Header() {
	const { token, logout } = useSession();
	const [open, setOpen] = useState(false);

	const handleOpenDialog = () => setOpen(true);
	const handleCloseDialog = () => setOpen(false);

	return (
		<StyledHeader>
			<Container
				maxWidth='xl'
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box>
					<Typography variant='h4' color='black'>
						Fullstack Affiliates
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<StyledNavigation>
						<MuiLink
							underline='none'
							href='/sellers'
							color='black'
							fontWeight={600}
						>
							<Typography>Vendedores</Typography>
						</MuiLink>
						<MuiLink
							underline='none'
							href='/transactions'
							color='black'
							fontWeight={600}
						>
							<Typography>Transações</Typography>
						</MuiLink>
						<Button variant='text' color='primary' onClick={handleOpenDialog}>
							<Typography fontWeight={600}>Importar</Typography>
						</Button>
					</StyledNavigation>

					{token && (
						<Button variant='contained' color='secondary' onClick={logout}>
							sair
						</Button>
					)}
					{!token && (
						<Button variant='contained' color='secondary'>
							entrar
						</Button>
					)}
				</Box>
			</Container>
			{open && <DialogForm open={open} onRefuse={handleCloseDialog} />}
		</StyledHeader>
	);
}
