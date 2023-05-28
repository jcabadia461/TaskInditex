import { HttpError } from '.';
import { BaseResponseInterface } from '../response.interface';

export class BadRequest extends HttpError implements BaseResponseInterface {
  public code: number = 400;
  public message: string = 'Bad Request';
}
