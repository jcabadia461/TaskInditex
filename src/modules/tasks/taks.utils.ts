import { join } from 'path';
import { Request } from 'express';

function getUrlFromImagePath(req: Request, imagePath: string) {
  const { origin } = req.headers;
  return join(origin as string, imagePath.replace(process.env.OUTPUT_IMAGES_DIR || 'output', ''));
}

export { getUrlFromImagePath };
