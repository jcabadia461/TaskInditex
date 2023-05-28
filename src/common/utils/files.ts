import fs from 'fs';
import { InternalServerError } from '../response/error';
import crypto from 'crypto';
import { join } from 'path';
import sharp from 'sharp';
import { IImageWidthAndHeight } from '../schemas/interfaces/image';
import path from 'path';

function moveUploadedImageToOutputDirectory(file: Express.Multer.File): string {
  try {
    console.log(process.env.OUTPUT_IMAGES_DIR);
    console.log('.........-.-.-.-.-.-.-.-.-.-.-.-.-.');
    const extension = path.extname(file.filename);
    const name = path.basename(file.filename, extension);
    createDirectory(join(process.env.OUTPUT_IMAGES_DIR as string, name));

    const pathFile = join(process.env.OUTPUT_IMAGES_DIR as string, name, file.filename);
    fs.renameSync(file.path, join(process.env.PWD as string, pathFile));
    return pathFile;
  } catch (error) {
    throw new InternalServerError('can not move uploaded image to output directory');
  }
}

function writeResizeImageToOutputDirectory(width: number, originalName: string, imageData) {
  try {
    const imageBuffer = Buffer.from(imageData, 'base64');
    const md5Image = getMd5FromImageBuffer(imageBuffer);
    const extension = path.extname(originalName);
    const name = path.basename(originalName, extension);
    const dirName = join(process.env.OUTPUT_IMAGES_DIR as string, name, `${width}`);
    createDirectory(dirName);
    fs.writeFileSync(join(dirName, `${md5Image}${extension}`), imageBuffer);
    return {
      md5: md5Image,
      name: `${md5Image}${extension}`,
      path: join(dirName, `${md5Image}${extension}`),
    };
  } catch (error: any) {
    throw error.message;
  }
}

function createDirectory(name) {
  if (!fs.existsSync(name)) fs.mkdirSync(name, { recursive: true });
}

function getMD5FromFileContent(file: string) {
  try {
    const imageBuffer = fs.readFileSync(file);
    return getMd5FromImageBuffer(imageBuffer);
  } catch (error) {
    throw new InternalServerError('can not get md5 from content file');
  }
}

function getMd5FromImageBuffer(imageBuffer: Buffer) {
  const md5Hash = crypto.createHash('md5');
  md5Hash.update(imageBuffer);
  const md5Digest = md5Hash.digest('hex');
  return md5Digest;
}

function getWidthAndHeightFromImageFile(file): Promise<IImageWidthAndHeight> {
  return new Promise((resolve, reject) => {
    const statFile = fs.statSync(file);
    if (statFile) {
      sharp(file)
        .metadata()
        .then((metadata) => {
          const width = metadata.width as number;
          const height = metadata.height as number;
          resolve({ width, height, size: statFile.size });
        })
        .catch((err: any) => {
          reject(new InternalServerError(err.message));
        });
    }
  });
}

export {
  moveUploadedImageToOutputDirectory,
  getMD5FromFileContent,
  getWidthAndHeightFromImageFile,
  getMd5FromImageBuffer,
  writeResizeImageToOutputDirectory,
};
