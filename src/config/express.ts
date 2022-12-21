import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const createServer = (): express.Application => {
	const app = express();

	app.use(helmet());
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.disable('x-powered-by');

	app.get('/health', (_req, res) => {
		res.status(200).send({ message: 'OK' });
	});

	return app;
};

export { createServer };
