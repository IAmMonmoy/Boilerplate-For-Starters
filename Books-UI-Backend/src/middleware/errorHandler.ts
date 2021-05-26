import { Request, Response, NextFunction, Router } from 'express';
import { HTTP400Error, HTTP500Error } from '../utils/Errors';
import { errorLogger } from '../utils/logger';

export const clientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorLogger(err.message + ',' + err.stack);
   if (err instanceof HTTP400Error) {
    res.status(400).send(err);
  } else {
    res.status(500).send(new HTTP500Error('GenericError', 'Something Went Wrong'));
  }
})};

export const serverError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response) => {
  errorLogger(err.message + ',' + err.stack);
  res.status(500).send(new HTTP500Error('GenericError', 'Something Went Wrong'));
})};

module.exports = { serverError, clientError }
