import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Login } from './pages/login';
import { Seller } from './pages/sellers';
import { Transactions } from './pages/transactions';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/sellers',
		element: <Seller />,
	},
	{
		path: '/transactions',
		element: <Transactions />,
	},
]);
