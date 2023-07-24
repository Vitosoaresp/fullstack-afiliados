import { Box, Container, Paper, Typography } from '@mui/material';
import { TransactionsList } from '../components/TransactionsList';

export function Transactions() {
	return (
		<Container maxWidth='xl'>
			<Paper variant='outlined' sx={{ mt: 6 }}>
				<Box sx={{ p: 4, width: '100%' }}>
					<Typography variant='h5' textAlign='center'>
						Trasações
					</Typography>
				</Box>

				<Box sx={{ p: 4 }}>
					<TransactionsList />
				</Box>
			</Paper>
		</Container>
	);
}
