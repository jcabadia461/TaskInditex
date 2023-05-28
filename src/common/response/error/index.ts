export type ErrorLevel = 'ERROR' | 'FATAL' | 'INFO' | 'WARNING';

export interface ErrorDetails {
  audit_type?: string;
  error?: { name?: string; message: string; stack?: string };
  [key: string]: unknown;
}

export interface ErrorBody {
  code: string;
  level?: ErrorLevel;
  description?: string;
  message?: string;
}

export interface ErrorResponse {
  errors: Array<ErrorBody>;
}

export class HttpError {
  public code?: number;
  public details?: ErrorDetails;
  public level: ErrorLevel;
  public description?: string;
  public message?: string;

  constructor(description?: string, level: ErrorLevel = 'FATAL', details?: ErrorDetails) {
    this.details = details;
    this.description = description;
    this.level = level;
  }
}

export * from './bad-request';
export * from './not-found';
export * from './internal-server-error';
export * from './method-not-allowed';
