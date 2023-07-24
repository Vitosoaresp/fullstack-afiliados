import { Box, SxProps, Typography } from '@mui/material';

interface EmptyDataProps {
	sx?: SxProps;
}

export default function EmptyData({ sx }: EmptyDataProps) {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			margin='0 auto'
			sx={{ ...sx }}
		>
			<Typography variant='body1' textAlign='center' component='h3' my={3}>
				Não há nenhum registro para ser visualizado
			</Typography>
		</Box>
	);
}
