import app from './app';
import {PORT} from './utils/config';
import * as logger from './utils/logger';
import {connectToDatabase} from './utils/db';

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

void start();