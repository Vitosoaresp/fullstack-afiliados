import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import useSWR from 'swr';
import { Seller } from '../../types/seller';
import SpinLoading from '../SpinLoading';
import TableHeader from './TableHead';
import { Row } from './TableRow';

export function SellersList() {
	const { data, isLoading } = useSWR<Seller[]>('/sellers');

	const hasData = !isLoading && data && data.length > 0;
	return (
		<TableContainer component={Paper} variant='elevation'>
			<Table>
				<TableHeader />
				<TableBody>
					{hasData &&
						data?.map((seller) => (
							<Row
								key={seller.id}
								name={seller.name}
								transactions={seller.Transaction}
								type={seller.type}
							/>
						))}
				</TableBody>
			</Table>
			{isLoading && <SpinLoading />}
		</TableContainer>
	);
}
