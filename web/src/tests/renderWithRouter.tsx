import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from '../context/session';
import { SWRConfiguration } from '../lib/SWRConfiguration';
import { theme } from '../theme';

// eslint-disable-next-line react-refresh/only-export-components
const Wrappers = ({ children }: { children: JSX.Element }) => (
	<SWRConfiguration>
		<SessionProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>{children}</BrowserRouter>
			</ThemeProvider>
		</SessionProvider>
	</SWRConfiguration>
);

export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
	window.history.pushState({}, '', route);
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: Wrappers }),
	};
};
