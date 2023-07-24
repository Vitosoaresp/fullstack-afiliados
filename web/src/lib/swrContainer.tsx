import { SWRConfig } from 'swr';
import { api } from './api';

interface SWRConfigurationProps {
	children: React.ReactNode;
}

const fetch = (url: string) => api.get(url).then((res) => res.data);

export function SWRConfiguration({ children }: SWRConfigurationProps) {
	return (
		<SWRConfig
			value={{
				refreshInterval: 9000,
				fetcher: fetch,
			}}
		>
			{children}
		</SWRConfig>
	);
}
