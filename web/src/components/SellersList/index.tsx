import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
} from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';
import { Seller } from '../../types/seller';
import EmptyData from '../EmptyData';
import SpinLoading from '../SpinLoading';
import TableHeader from './TableHead';
import { Row } from './TableRow';

export function SellersList() {
	const { data, isLoading } = useSWR<Seller[]>('/sellers');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
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
	const START_PAGINATION = page * rowsPerPage;
	const END_PAGINATION = page * rowsPerPage + rowsPerPage;

	return (
		<TableContainer component={Paper} variant='elevation'>
			{!hasData && !isLoading && <EmptyData />}
			{hasData && (
				<Table>
					<TableHeader />
					<TableBody>
						{data.slice(START_PAGINATION, END_PAGINATION).map((seller) => (
							<Row
								key={seller.id}
								seller={seller}
								transactions={seller.Transaction}
							/>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 20]}
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
