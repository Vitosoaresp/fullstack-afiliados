import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SessionProvider } from './context/session.tsx';
import { SWRConfiguration } from './lib/SWRConfiguration.tsx';
import { router } from './routes.tsx';
import { theme } from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SWRConfiguration>
			<SessionProvider>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</SessionProvider>
		</SWRConfiguration>
	</React.StrictMode>,
);
