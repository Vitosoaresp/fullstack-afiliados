import { Menu as MenuIcon } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	Divider,
	Menu,
	MenuItem,
	Link as MuiLink,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { DialogForm } from '../DialogForm';
import Navigation from './Navigation';
import { StyledHeader, StyledMenuIcon } from './styles';

export function Header() {
	const { logout } = useSession();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDialog, setOpenDialog] = useState(false);

	const open = Boolean(anchorEl);
	const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);
	const handleCloseMenu = () => setAnchorEl(null);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

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
					{desktop && <Navigation />}

					<StyledMenuIcon onClick={handleOpenMenu}>
						<MenuIcon />
					</StyledMenuIcon>
				</Box>
			</Container>

			<Menu anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
				<MenuItem onClick={handleCloseMenu}>
					<MuiLink
						underline='none'
						href='/sellers'
						color='black'
						width='100%'
						fontWeight={600}
					>
						<Typography textAlign='center'>Vendedores</Typography>
					</MuiLink>
				</MenuItem>
				<MenuItem onClick={handleCloseMenu}>
					<MuiLink
						underline='none'
						href='/transactions'
						color='black'
						fontWeight={600}
						width='100%'
					>
						<Typography textAlign='center'>Transações</Typography>
					</MuiLink>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleCloseMenu}>
					<Button
						fullWidth
						variant='text'
						color='primary'
						onClick={handleOpenDialog}
					>
						<Typography fontWeight={600}>Importar</Typography>
					</Button>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleCloseMenu}>
					<Button
						fullWidth
						variant='text'
						color='secondary'
						onClick={handleLogout}
					>
						sair
					</Button>
				</MenuItem>
			</Menu>

			{openDialog && (
				<DialogForm open={openDialog} onRefuse={handleCloseDialog} />
			)}
		</StyledHeader>
	);
}
