import express from 'express';
import router from '../routes/index';
import { errorHandler } from '../common/middlewares/error';
import { notFoundHandler } from '../common/middlewares/not-found';
import cors from 'cors';
import { join } from 'path';

export const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: 8192 }));
app.use(
  express.static(join(__dirname, '..', '..', '..', process.env.OUTPUT_IMAGES_DIR || 'output'), { maxAge: 86400000 }),
);

app.use(`${process.env.API_BASE_PATH || ''}`, router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
