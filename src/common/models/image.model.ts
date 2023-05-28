import { executeQueryFindOne, executeQueryFindAll } from './database';
import { Iimage, InewImageComplete } from '../schemas/interfaces/image';

const createImageDB = async (image: Iimage): Promise<InewImageComplete> => {
  const { originalname, path, size, md5, width, height } = image;
  const txtSql = `
    INSERT INTO images (original_name, path, size, md5, width, height)
    VALUES ('${originalname}', '${path}', '${size}', '${md5}', ${width}, ${height})
    RETURNING
      id,
      origin_image_id,
      original_name as "originalname",
      size,
      path,
      md5,
      width,
      height,
      created_at as "createdAt"
  `;
  return await executeQueryFindOne(txtSql);
};

const createImageResizeDB = async (image: Iimage): Promise<InewImageComplete> => {
  const { originImageId, path, size, md5, width, height } = image;
  const txtSql = `
    INSERT INTO images (origin_image_id, path, size, md5, width, height)
    VALUES ('${originImageId}', '${path}', '${size}', '${md5}', ${width}, ${height})
    RETURNING
      id,
      origin_image_id,
      original_name as "originalname",
      size,
      path,
      md5,
      width,
      height,
      created_at as "createdAt"
  `;
  return await executeQueryFindOne(txtSql);
};

const getImageById = async (imageId): Promise<InewImageComplete> => {
  const txtSql = `
    SELECT
      *
    FROM images
    WHERE id = '${imageId}'
  `;
  return await executeQueryFindOne(txtSql);
};

const getImagesByIdImageOriginal = async (imageId): Promise<InewImageComplete[]> => {
  const txtSql = `
    SELECT
      *
    FROM images
    WHERE origin_image_id = '${imageId}'
  `;
  return await executeQueryFindAll(txtSql);
};

export { createImageDB, createImageResizeDB, getImageById, getImagesByIdImageOriginal };
