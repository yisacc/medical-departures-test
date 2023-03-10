import * as logger  from './logger';
import { NextFunction, Request, Response } from 'express';

const requestLogger = (request:Request, _response:Response, next:NextFunction) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_request:Request, response:Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error:Error, _request:Request, response:Response, next:NextFunction) => {

  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message});
  }

  next(error);
return null;
};

export {
  requestLogger,
  unknownEndpoint,
  errorHandler
};