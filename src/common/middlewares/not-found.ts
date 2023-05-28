import { Request, Response, NextFunction } from 'express';

import { NotFound } from '../response';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  next(new NotFound('Route not found'));
};
