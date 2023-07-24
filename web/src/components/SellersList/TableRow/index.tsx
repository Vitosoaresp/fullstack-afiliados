import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
	Box,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Transaction } from '../../../types/seller';
import {
	formatValue,
	getComissionValue,
	getTypeOperationValue,
} from '../../../utils/helper';

interface TableRowProps {
	name: string;
	type: 'producer' | 'affiliate';
	transactions: Transaction[] | [];
}

export function Row({ name, type, transactions }: TableRowProps) {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(!isOpen);

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton aria-label='expand row' size='small' onClick={handleOpen}>
						{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell align='right'>
					{type === 'affiliate' ? 'Afiliado' : 'Produtor'}
				</TableCell>
				<TableCell align='right'>{getComissionValue(transactions)}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isOpen} timeout='auto' unmountOnExit>
						<Box>
							<Typography variant='h6' mt={1} gutterBottom component='div'>
								Transações
							</Typography>
							<Table size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Data</TableCell>
										<TableCell>ID do Produto</TableCell>
										<TableCell align='right'>Valor</TableCell>
										<TableCell align='right'>Tipo da operação</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transactions?.map((transaction) => (
										<TableRow key={transaction.id}>
											<TableCell>
												{format(
													new Date(transaction.date),
													'dd/MM/yyyy, HH:mm',
												)}
											</TableCell>
											<TableCell>{transaction.productId}</TableCell>
											<TableCell align='right'>
												{formatValue(transaction.price)}
											</TableCell>
											<TableCell align='right'>
												{getTypeOperationValue(transaction.typeId)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
