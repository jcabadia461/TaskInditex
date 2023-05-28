import express, { Router } from 'express';
import { handleCreateTask, handleGetTask } from './tasks.controller';
import { methodNotAllowed } from '../../common/middlewares/method-not-allowed';
import validateInputData from '../../common/middlewares/input-data-validator';
import { createTaskSchema, getTaskSchema } from './tasks.schemas';
import upload from '../../common/middlewares/upload';
import { MIME_TYPE } from '../../common/constants/mime.type.constants';

const router: Router = express.Router();
const validMimeTypes = [MIME_TYPE.JPEG, MIME_TYPE.JPG, MIME_TYPE.PNG];

router.post('/', validateInputData(createTaskSchema), upload('fieldName', validMimeTypes), handleCreateTask);
router.get('/:taskId', validateInputData(getTaskSchema), handleGetTask);

router.all(['/'], methodNotAllowed);

export default router;
