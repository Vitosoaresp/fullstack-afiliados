import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import sellersRouter from './routes/sellers';
import transactionsRouter from './routes/transaction';
import swaggerDocs from './swagger.json';

class App {
	public app: express.Express;

	constructor() {
		this.app = express();

		this.config();

		this.app.use('/', authRouter);
		this.app.use('/transactions', transactionsRouter);
		this.app.use('/sellers', sellersRouter);
		this.app.use('/products', productRouter);
		app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
