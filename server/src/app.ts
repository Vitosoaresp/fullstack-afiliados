import cors from 'cors';
import express from 'express';
import saleRouter from './routes/sale';

class App {
	public app: express.Express;

	constructor() {
		this.app = express();

		this.config();

		this.app.get('/', (req, res) => res.json({ ok: true }));
		this.app.use('/sales', saleRouter);
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
