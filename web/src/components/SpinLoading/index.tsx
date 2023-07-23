import { Box, CircularProgress, SxProps, alpha, styled } from '@mui/material';

const Root = styled(Box)(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	bottom: 0,
	top: 0,
	zIndex: 20,
	backgroundColor: `${alpha(theme.palette.background.paper, 0.5)}`,
}));

const Progress = styled(CircularProgress)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	marginLeft: -40 / 2,
	marginTop: -40 / 2,
	zIndex: 30,
}));

type Props = {
	sx?: SxProps;
};

const SpinLoading = ({ sx }: Props) => {
	return (
		<Root sx={sx}>
			<Progress />
		</Root>
	);
};

export default SpinLoading;
