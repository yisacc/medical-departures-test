import app from './src/app';
import {PORT} from './src/utils/config';
import * as logger from './src/utils/logger';


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
