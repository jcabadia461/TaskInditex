import fs from 'fs';
import os from 'os';
import multer from 'multer';
import { NextFunction, Request } from 'express';

import { BadRequest } from '../response';
import { MIME_TYPE } from '../constants/mime.type.constants';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb): void => {
    const dir = os.tmpdir();
    const dirExists = fs.existsSync(dir);
    if (!dirExists) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb): void => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

function getFileFilter(validMimeTypes: string[]) {
  return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    const { mimetype, originalname } = file;
    if (validMimeTypes.length && !validMimeTypes.some((e: string) => e === mimetype)) {
      cb(new Error(`Invalid mimetype [${file.mimetype}]. Only [${validMimeTypes.join(', ')}] allowed.`));
      return;
    }

    const startIndex = originalname.lastIndexOf('.');
    const extension = originalname.substring(startIndex + 1).toUpperCase();
    const extensionMimeType = MIME_TYPE[extension];
    if (extensionMimeType !== mimetype) {
      cb(
        new Error(
          `The file extension [${extension}] doesn't match with mimetype [${file.mimetype}]. It should be [${extensionMimeType}].`,
        ),
      );
      return;
    }

    cb(null, true);
  };
}

function upload(fieldName: string, validMimeTypes: string[]) {
  return (req: Request, res: any, next: NextFunction) => {
    if (req.is(MIME_TYPE.FORM_DATA)) {
      const options: multer.Options = {
        storage,
        fileFilter: getFileFilter(validMimeTypes),
      };
      const fileUpload = multer(options).single(fieldName);
      fileUpload(req, res, (err: any) => {
        if (err) {
          next(new BadRequest(err.message));
          return;
        }

        next();
      });
    } else {
      next();
    }
  };
}

export default upload;
