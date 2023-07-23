import { TableCell, TableHead, TableRow } from '@mui/material';

export default function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell></TableCell>
				<TableCell>Nome</TableCell>
				<TableCell align='right'>Tipo</TableCell>
				<TableCell align='right'>Comissão</TableCell>
			</TableRow>
		</TableHead>
	);
}
