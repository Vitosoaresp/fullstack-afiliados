import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Header } from './components/Header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import Seller from './pages/sellerDetail';
import Sellers from './pages/sellers';
import { Transactions } from './pages/transactions';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: (
			<>
				<Header />
				<Login />
			</>
		),
	},
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/sellers/:id',
		element: (
			<>
				<Header />
				<Seller />
			</>
		),
	},
	{
		path: '/sellers',
		element: (
			<>
				<Header />
				<Sellers />
			</>
		),
	},
	{
		path: '/transactions',
		element: (
			<>
				<Header />
				<Transactions />
			</>
		),
	},
	{
		path: '/register',
		element: (
			<>
				<Header />
				<Register />
			</>
		),
	},
]);
