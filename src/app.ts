import express from 'express';
const app = express();
import cors from 'cors';
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';
import SwaggerInit from './swagger/init'
import routes from './routes'
import DBSchema from './db_pool/schema'
import PGPool from './db_pool/pg_pool';
import * as config from '../config'

async function main() {


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
	// set dbpool
	const pool = new PGPool(config.dbObj)
	app.set('dbPool', pool)
	await DBSchema.handle(main, pool, config.dbObj)

	// set swagger
	try {
		await SwaggerInit();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const oas3Specification: any = yaml.load(fs.readFileSync(path.resolve(__dirname,'./swagger/backend_api.yaml'), 'utf8'))
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		app.use('/swagger', swaggerUi.serve, swaggerUi.setup(oas3Specification))
	} catch (error) {
		logger.error(`main(): Swagger error: ${error}`)
	}
app.get('/ping', (_req, res) => {
    logger.info('someone pinged here');
    res.send('pong');
  });
  app.use('/api', routes)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
}
void main()

export default app;