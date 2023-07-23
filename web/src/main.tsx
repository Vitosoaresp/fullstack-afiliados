import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SessionProvider } from './context/session.tsx';
import { SWRConfiguration } from './lib/swrContainer.tsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SWRConfiguration>
			<SessionProvider>
				<App />
			</SessionProvider>
		</SWRConfiguration>
	</React.StrictMode>,
);
