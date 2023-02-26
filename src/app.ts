import express from 'express';
const app = express();
import cors from 'cors';
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';
import blogsRouter from './controllers/blogs';
import {connectToDatabase} from './utils/db';
import usersRouter from './controllers/users';
import loginRouter from './controllers/login';

const start = async () => {
await connectToDatabase()
};

void start();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/ping', (_req, res) => {
    logger.info('someone pinged here');
    res.send('pong');
  });
  app.use('/api/users', usersRouter)
  app.use('/api/blogs',blogsRouter)
  app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;