import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middleware/error';
import productRouter from './routes/product';
import saleRouter from './routes/sale';
import sellersRouter from './routes/sellers';

class App {
	public app: express.Express;

	constructor() {
		this.app = express();

		this.config();

		this.app.use('/sales', saleRouter);
		this.app.use('/sellers', sellersRouter);
		this.app.use('/products', productRouter);
		this.app.use(errorHandler);
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	public start(PORT: string | number): void {
		this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
	}
}

export { App };

export const { app } = new App();
