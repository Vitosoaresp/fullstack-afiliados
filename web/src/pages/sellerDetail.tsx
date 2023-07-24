import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import SpinLoading from '../components/SpinLoading';
import { Seller as ISeller } from '../types/seller';

interface SellerParams {
	id: string;
}

export default function SellerDetail() {
	const { id } = useParams() as unknown as SellerParams;

	const { data, isLoading } = useSWR<ISeller>(`/sellers/${id}`);

	return (
		<Container maxWidth='xl'>
			{data && (
				<Paper
					variant='outlined'
					sx={{ mt: 6, display: 'flex', flexDirection: 'column', p: 8, gap: 4 }}
				>
					<Box sx={{ width: '100%' }}>
						<Avatar sx={{ width: 100, height: 100 }}>
							{data?.name[0].toUpperCase()}
						</Avatar>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								InputLabelProps={{ shrink: true }}
								label='Nome'
								defaultValue={data?.name}
								disabled
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								InputLabelProps={{ shrink: true }}
								label='Tipo'
								defaultValue={data?.type}
								disabled
							/>
						</Grid>
						<Grid item>
							<Button variant='contained' disabled>
								Salvar
							</Button>
						</Grid>
					</Grid>
				</Paper>
			)}
			{isLoading && <SpinLoading />}
		</Container>
	);
}
