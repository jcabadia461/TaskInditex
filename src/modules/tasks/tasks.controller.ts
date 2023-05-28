import { NextFunction, Request, Response } from 'express';
import { createTaskBLL, getTaskBLL } from './task.bll';
import { validateOutputData } from '../../common/validators/output-data-validator';
import { newTaskResponseSchema, getTaskResponseSchema } from './tasks.schemas';
import { BadRequest, NotFound } from '../../common/response';
import { getTaskById } from '../../common/models/task.model';
async function handleCreateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { file } = req;
    if (!file) {
      throw new BadRequest('Expected a file but got nothing');
    }
    const task = await createTaskBLL(req, file);
    validateOutputData(newTaskResponseSchema, task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

async function handleGetTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { taskId } = req.params;
    const task = await getTaskById(taskId);
    if (!task) {
      throw new NotFound(`Task id ${taskId} not found`);
    }
    const response = await getTaskBLL(task);
    validateOutputData(getTaskResponseSchema, response);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export { handleCreateTask, handleGetTask };
