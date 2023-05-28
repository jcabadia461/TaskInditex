import { executeQueryFindOne } from './database';
import { Itask } from '../schemas/interfaces/task';
import { TaskStatus } from '../schemas/interfaces/task';

const basicFields = `id,
  id_image as "idImage",
  created_at as "createdAt",
  status,
  start_processing_at as "startProcessingAt",
  end_processing_at as "endProcessingAt",
  error`;

const createTaskDB = async (imageId: string): Promise<Itask> => {
  const txtSql = `
    INSERT INTO tasks (id_image, status)
    VALUES ('${imageId}', '${TaskStatus.PENDING}')
    RETURNING ${basicFields}`;
  return await executeQueryFindOne(txtSql);
};

const taskErrorDB = async (id: string, error: string): Promise<Itask> => {
  error = error.replace(/'/g, '"');
  const txtSql = `
    UPDATE tasks 
    SET 
      status = '${TaskStatus.ERROR}',
      error = '${error}',
      end_processing_at = now()
    WHERE
      id = '${id}'
    RETURNING ${basicFields}`;
  return await executeQueryFindOne(txtSql);
};

const taskFinishedDB = async (id: string): Promise<Itask> => {
  const txtSql = `
    UPDATE tasks 
    SET 
      status = '${TaskStatus.COMPLETED}',
      end_processing_at = now()
    WHERE
      id = '${id}'
    RETURNING ${basicFields}`;
  return await executeQueryFindOne(txtSql);
};

const taskStartProcessingDB = async (id): Promise<void> => {
  const txtSql = `
    UPDATE tasks 
    SET 
      status = '${TaskStatus.IN_PROGRESS}',
      start_processing_at = now()
    WHERE
      id = '${id}'`;
  return await executeQueryFindOne(txtSql);
};

const getTaskById = async (id): Promise<Itask> => {
  const txtSql = `
    SELECT 
      ${basicFields}
    FROM tasks
    WHERE id = '${id}'
  `;
  return await executeQueryFindOne(txtSql);
};

export { createTaskDB, taskErrorDB, taskStartProcessingDB, taskFinishedDB, getTaskById };
