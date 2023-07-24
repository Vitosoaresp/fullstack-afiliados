import { Button, Link as MuiLink, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../../hooks/useSession';
import { DialogForm } from '../../DialogForm';
import { StyledNavigation } from '../styles';

export default function Navigation() {
	const { logout } = useSession();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleOpenDialog = () => setOpen(true);
	const handleCloseDialog = () => setOpen(false);

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<>
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
				<Button variant='contained' color='secondary' onClick={handleLogout}>
					sair
				</Button>
			</StyledNavigation>

			{open && <DialogForm open={open} onRefuse={handleCloseDialog} />}
		</>
	);
}
