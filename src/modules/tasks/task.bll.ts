import { Request } from 'express';
import {
  createImageDB,
  createImageResizeDB,
  getImageById,
  getImagesByIdImageOriginal,
} from '../../common/models/image.model';
import { createTaskDB, taskErrorDB, taskStartProcessingDB, taskFinishedDB } from '../../common/models/task.model';
import {
  moveUploadedImageToOutputDirectory,
  getMD5FromFileContent,
  getWidthAndHeightFromImageFile,
  writeResizeImageToOutputDirectory,
} from '../../common/utils/files';
import { Iimage, IimageBuffer } from '../../common/schemas/interfaces/image';
import { getUrlFromImagePath } from './taks.utils';
import fs from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';
import { Itask, ItaskDetails } from '../../common/schemas/interfaces/task';

async function createTaskBLL(req: Request, file: Express.Multer.File) {
  const pathFile = moveUploadedImageToOutputDirectory(file);
  const md5 = getMD5FromFileContent(pathFile);
  const widthAndHeight = await getWidthAndHeightFromImageFile(pathFile);
  const { originalname, size } = file;
  const newImage: Iimage = {
    originalname,
    size,
    path: pathFile,
    md5,
    width: widthAndHeight.width,
    height: widthAndHeight.height,
  };
  const imageRecord = await createImageDB(newImage);
  const taskRecord = await createTaskDB(imageRecord.id);

  const result = {
    id: taskRecord.id,
    image: getUrlFromImagePath(req, imageRecord.path),
    createdAt: taskRecord.createdAt,
  };
  processTask(originalname, imageRecord.id, taskRecord.id, pathFile);

  return result;
}

async function processTask(originalname: string, idImage: string, idTask: string, pathFile: string) {
  await taskStartProcessingDB(idTask);
  Promise.all([getResize(pathFile, 1024), getResize(pathFile, 800)])
    .then(async (res) => {
      for (const image of res) {
        const result = writeResizeImageToOutputDirectory(image.width, originalname, image.image.data);
        const detailsImage = await getWidthAndHeightFromImageFile(result.path);
        const imageResized: Iimage = {
          originImageId: idImage,
          size: detailsImage.size,
          path: result.path,
          md5: result.md5,
          width: detailsImage.width,
          height: detailsImage.height,
        };
        await createImageResizeDB(imageResized);
      }
      taskFinishedDB(idTask);
    })
    .catch((err) => {
      taskErrorDB(idTask, err.message);
    });
}

async function getResize(file: string, width: number): Promise<IimageBuffer> {
  const data = fs.readFileSync(join(process.env.PWD as string, file));
  const base64Data = Buffer.from(data).toString('base64');
  const response = await callFunctionResizeImage(base64Data, width);
  return response;
}

function callFunctionResizeImage(base64Data: string, width: number): Promise<IimageBuffer> {
  return new Promise((resolve, reject) => {
    fetch(process.env.URI_FIREBASE_RESIZE_IMAGE as string, {
      method: 'POST',
      body: JSON.stringify({ image: base64Data, width }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error('Error de solicitud: ' + response.status + ' - ' + errorText);
          });
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getTaskBLL(task: Itask): Promise<ItaskDetails> {
  const imageOriginal = await getImageById(task.idImage);
  const images = await getImagesByIdImageOriginal(task.idImage);
  const response = {
    task: {
      ...task,
    },
    originalImage: {
      ...imageOriginal,
    },
    resizedImages: {
      ...images,
    },
  };
  return response;
}

export { createTaskBLL, getTaskBLL };
