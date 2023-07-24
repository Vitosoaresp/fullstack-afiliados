import { IconButton, styled } from '@mui/material';

export const StyledHeader = styled('header')`
	width: 100%;
	padding: 16px 0;
	background-color: white;

	@media screen and (max-width: 768px) {
		h4 {
			font-size: 18px;
		}
	}
`;

export const StyledNavigation = styled('nav')`
	display: flex;
	align-items: center;
	gap: 24px;
`;

export const StyledMenuIcon = styled(IconButton)`
	display: none;

	@media screen and (max-width: 768px) {
		display: flex;
	}
`;

export const StyledMenuRoot = styled('div')<{ open: boolean }>(({ open }) => ({
	position: 'absolute',
	top: '100%',
	left: 0,
	right: 0,
	backgroundColor: 'white',
	padding: '16px 0',
	display: open ? 'block' : 'none',
	zIndex: 1,
}));
