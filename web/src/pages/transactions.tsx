import { Box, Paper, Typography } from '@mui/material';
import { TransactionsList } from '../components/TransactionsList';

export function Transactions() {
	return (
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
	);
}
