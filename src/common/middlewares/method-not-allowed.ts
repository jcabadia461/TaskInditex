import { Request, Response, NextFunction } from 'express';
import { MethodNotAllowed } from '../response/error/method-not-allowed';

export const methodNotAllowed = (request: Request, response: Response, next: NextFunction) => {
  const error = new MethodNotAllowed('This method is not allowed for this endpoint');
  next(error);
};
