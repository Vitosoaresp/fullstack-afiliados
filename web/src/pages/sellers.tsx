import { Box, Paper, Typography } from '@mui/material';
import { SellersList } from '../components/SellersList';

export function Seller() {
	return (
		<Paper variant='outlined' sx={{ mt: 6 }}>
			<Box sx={{ p: 4, width: '100%' }}>
				<Typography variant='h5' textAlign='center'>
					Vendedores
				</Typography>
			</Box>

			<Box sx={{ p: 4 }}>
				<SellersList />
			</Box>
		</Paper>
	);
}
