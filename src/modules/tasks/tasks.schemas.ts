import Joi from 'joi';
import { GENERIC_ID_REGEX } from '../../common/constants/regexp.constants';

const createTaskSchema = Joi.object({
  headers: Joi.object({}),
  body: Joi.object({}),
  params: Joi.object({}),
  query: Joi.object({}),
});

const getTaskSchema = Joi.object({
  headers: Joi.object({}),
  body: Joi.object({}),
  params: Joi.object({
    taskId: Joi.string().pattern(GENERIC_ID_REGEX).min(36).max(36).required(),
  }),
  query: Joi.object({}),
});

const newTaskResponseSchema = Joi.object({
  id: Joi.string().min(1).max(50).pattern(GENERIC_ID_REGEX).required(),
  image: Joi.string().required(),
  createdAt: Joi.date().iso(),
});

const getTaskResponseSchema = Joi.object({
  task: Joi.object({
    id: Joi.string().min(1).max(50).pattern(GENERIC_ID_REGEX).required(),
    idImage: Joi.string().min(1).max(50).pattern(GENERIC_ID_REGEX).required(),
    createdAt: Joi.date().iso(),
    status: Joi.string(),
    startProcessingAt: Joi.date().iso().allow(null),
    endProcessingAt: Joi.date().iso().allow(null),
    error: Joi.string().allow(null),
  }),
  originalImage: Joi.object().allow(null),
  resizedImages: Joi.object().allow(null),
});

export { newTaskResponseSchema, createTaskSchema, getTaskSchema, getTaskResponseSchema };
