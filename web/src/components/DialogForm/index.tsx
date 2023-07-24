import { Close } from '@mui/icons-material';
import {
	Box,
	Button,
	Dialog,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { api } from '../../lib/api';
import { formatDataToJson } from '../../utils/helper';
import SpinLoading from '../SpinLoading';

interface DialogFormProps {
	open: boolean;
	onRefuse: () => void;
}

export function DialogForm({ open, onRefuse }: DialogFormProps) {
	const [fileData, setFileData] = useState<string | null>(null);
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const fileContent = reader.result as string;
				setFileData(fileContent);
			};
			reader.readAsText(file);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formatedFile = formatDataToJson(fileData as string);
		if (!formatedFile) {
			setError('Error ao formatar o arquivo!');
			return;
		}
		try {
			setLoading(true);
			await api.post('/transactions', formatedFile);
			onRefuse();
		} catch (error) {
			setError('Error ao salvar o arquivo');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open}>
			<Box sx={{ p: 2, position: 'relative' }}>
				<Typography variant='h5' textAlign='center'>
					Importar dados
				</Typography>
				<IconButton
					onClick={onRefuse}
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
					}}
				>
					<Close />
				</IconButton>
			</Box>
			<Divider />
			<Box p={4}>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							gap: 4,
						}}
					>
						<input
							id='file'
							type='file'
							accept='.txt'
							onChange={handleFileChange}
						/>

						{error && <Typography color='red'>{error}</Typography>}

						<Button
							type='submit'
							variant='outlined'
							disabled={!fileData || loading}
						>
							Salvar
						</Button>
					</Box>
				</form>
				{loading && <SpinLoading />}
			</Box>
		</Dialog>
	);
}
