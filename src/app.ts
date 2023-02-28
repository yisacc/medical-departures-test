import express from 'express';
const app = express();
import cors from 'cors';
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';
import {connectToDatabase} from './utils/db';
import SwaggerInit from './swagger/init'
import routes from './routes'

async function main() {
await connectToDatabase()


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

	// set swagger
	try {
		await SwaggerInit();
		const oas3Specification: any = yaml.load(fs.readFileSync(path.resolve(__dirname,'./swagger/backend_api.yaml'), 'utf8'))
		app.use('/swagger', swaggerUi.serve, swaggerUi.setup(oas3Specification, {explorer:true}))
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