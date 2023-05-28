import Joi from 'joi';

import { InternalServerError } from '../response';

export function validateOutputData(schema: Joi.AnySchema, data: any): void {
  const validationResult: Joi.ValidationResult = schema.validate(data, { abortEarly: false });
  const { error } = validationResult;
  if (error) throw new InternalServerError(`Invalid output data. Schema errors: ${error}`);
}
