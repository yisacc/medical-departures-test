import app from '../src/app';
import {PORT} from './utils/config';
import * as logger from './utils/logger';


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
