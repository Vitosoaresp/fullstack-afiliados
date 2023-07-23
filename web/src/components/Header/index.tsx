import {
	Box,
	Button,
	Container,
	Link as MuiLink,
	Typography,
} from '@mui/material';
import { useSession } from '../../hooks/useSession';
import { StyledHeader, StyledNavigation } from './styles';

export function Header() {
	const { email } = useSession();
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
					</StyledNavigation>

					{email && (
						<Button variant='contained' color='secondary' disabled>
							sair
						</Button>
					)}
					{!email && (
						<Button variant='contained' color='secondary' disabled>
							entrar
						</Button>
					)}
				</Box>
			</Container>
		</StyledHeader>
	);
}
