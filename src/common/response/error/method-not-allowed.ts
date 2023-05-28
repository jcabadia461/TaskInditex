import { HttpError } from '.';
import { BaseResponseInterface } from '../response.interface';

export class MethodNotAllowed extends HttpError implements BaseResponseInterface {
  public code: number = 405;
  public message: string = 'Method Not Allowed';
}
