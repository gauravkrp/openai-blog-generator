import * as dotenv from 'dotenv';
import 'module-alias/register';

import { createServer } from '@config/express';
// import { connect }  from '@config/database';
import Routes from '@src/routes';

dotenv.config();

const port = Number(process.env.PORT || 5005);
// const db_uri = process.env.MONGODB_URI;

if (!port) {
	process.exit(1);
}

const startServer = async () => {
	// init express app
	const app = createServer();

	// connect to db
	// connect(db_uri);

	app.listen(port, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});

	// api routes
	app.use('/api', Routes);
	app.use('/', (_req, res) => {
    res.status(404).send({ message: 'OpenAI API, powered by Xplorai' });
  });
};

startServer();

