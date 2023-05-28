import { ErrorLevel, HttpError } from '.';

export interface BaseResponseInterface extends HttpError {
  code: number;
  level: ErrorLevel;
  message: string;
  description?: string;
}
