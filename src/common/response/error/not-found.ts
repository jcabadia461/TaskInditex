import { HttpError } from '.';
import { BaseResponseInterface } from '../response.interface';

export class NotFound extends HttpError implements BaseResponseInterface {
  public code: number = 404;
  public message: string = 'Not Found';
}
