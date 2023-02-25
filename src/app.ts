import express from 'express';
const app = express();
import cors from 'cors';
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/ping', (_req, res) => {
    logger.info('someone pinged here');
    res.send('pong');
  });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;