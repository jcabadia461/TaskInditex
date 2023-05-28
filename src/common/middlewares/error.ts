import { Request, Response, NextFunction } from 'express';
import { ErrorBody, ErrorResponse, HttpError, InternalServerError } from '../response';

const errorResponse = (errors: ErrorBody[]): ErrorResponse => {
  return {
    errors,
  };
};

const sendError = (error: HttpError, res: Response) => {
  const body: ErrorBody[] = [
    {
      code: `${error.code}`,
      message: error.message,
      level: error.level,
      description: error.description,
    },
  ];
  res.status(error.code!).json(errorResponse(body));
};

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  const httpError =
    err instanceof HttpError
      ? err
      : new InternalServerError(err?.message || 'Error in the error middleware', undefined, {
          error: { name: 'Unknown', message: err.message },
        });
  sendError(httpError, res);
};
