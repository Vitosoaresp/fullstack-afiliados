import {
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import useSWR from 'swr';
import { Transaction } from '../../types/transaction';
import { formatValue } from '../../utils/helper';
import EmptyData from '../EmptyData';
import SpinLoading from '../SpinLoading';

export function TransactionsList() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const { isLoading, data } = useSWR<Transaction[]>('transactions');
	const hasData = !isLoading && data && data.length > 0;

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<TableContainer component={Paper} variant='elevation'>
			{!hasData && !isLoading && <EmptyData />}
			{hasData && (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Data da operação</TableCell>
							<TableCell>Valor</TableCell>
							<TableCell>Vendedor</TableCell>
							<TableCell>Prouto</TableCell>
							<TableCell>Tipo da operação</TableCell>
							<TableCell>Natureza da operação</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell>
										{format(new Date(transaction.date), 'dd/MM/yyyy, HH:mm')}
									</TableCell>
									<TableCell>{formatValue(transaction.price)}</TableCell>
									<TableCell>
										<Link
											underline='none'
											color='inherit'
											href={`/sellers/${transaction.sellerId}`}
										>
											<Typography>{transaction.seller.name}</Typography>
										</Link>
									</TableCell>
									<TableCell>{transaction.product.name}</TableCell>
									<TableCell>{transaction.transaction.description}</TableCell>
									<TableCell>
										{transaction.transaction.natureOfTransaction}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								labelRowsPerPage='Linhas por página'
								count={data?.length || 0}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			)}
			{isLoading && <SpinLoading />}
		</TableContainer>
	);
}
