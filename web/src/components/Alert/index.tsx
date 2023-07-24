import { Close } from '@mui/icons-material';
import {
	Box,
	Collapse,
	IconButton,
	Alert as MuiAlert,
	Typography,
} from '@mui/material';

interface AlertProps {
	type: 'success' | 'error' | 'warning';
	message: string;
	open: boolean;
	onClose: () => void;
}

export default function Alert({ type, message, open, onClose }: AlertProps) {
	return (
		<Box sx={{ position: 'fixed', right: 30, top: 100 }}>
			<Collapse in={open}>
				<MuiAlert
					variant='filled'
					severity={type}
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={onClose}
						>
							<Close fontSize='inherit' />
						</IconButton>
					}
				>
					<Typography variant='body2'>{message}</Typography>
				</MuiAlert>
			</Collapse>
		</Box>
	);
}
