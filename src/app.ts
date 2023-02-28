import express from 'express';
const app = express();
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';
import {connectToDatabase} from './utils/db';
import routes from './routes'
import { swaggerDocument } from './swagger';

async function main() {
await connectToDatabase()


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
	// set swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer:true}))
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