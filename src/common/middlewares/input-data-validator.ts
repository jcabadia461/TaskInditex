import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { BadRequest } from '../response';

interface InputData {
  headers: any;
  body: any;
  params: any;
  query: any;
}

function getRequiredHeaders(headers: any, schema: Joi.ObjectSchema): any {
  if (!headers) return {};
  const requiredHeaders = {};
  const headersSchema = schema?.$_terms?.keys?.find((k: any) => k?.key === 'headers')?.schema;
  const headersKeys = headersSchema?.$_terms?.keys?.map((k: any) => k?.key) || [];
  const totalHeaders = headersKeys.length;
  for (let i = 0; i < totalHeaders; i += 1) {
    const headersKey = headersKeys[i];
    if (!headersKey) continue;
    requiredHeaders[headersKey] = headers[headersKey];
  }

  return requiredHeaders;
}

function validate(schema: Joi.ObjectSchema, inputData: InputData) {
  const validationResult: Joi.ValidationResult = schema.validate(inputData, { abortEarly: false });
  return validationResult;
}

function validateInputData(schema: Joi.ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = req;
    const headers = getRequiredHeaders(req.headers, schema);
    const inputData: InputData = { headers, body, params, query };
    const { value, error } = validate(schema, inputData);
    if (error) return next(new BadRequest(`Could not validate schema in middleware. ${error}`));
    req.query = value.query;
    next();
  };
}

export default validateInputData;
