import { HttpError } from '.';
import { BaseResponseInterface } from '../response.interface';

export class InternalServerError extends HttpError implements BaseResponseInterface {
  public code: number = 500;
  public message: string = 'Internal Server Error';
}
