// jest.mock('../src/common/logger');

// process.env.API_BASE_PATH = '';

process.env.PORT = '3001';
process.env.API_BASE_PATH = '';
process.env.OUTPUT_IMAGES_DIR = 'output';
process.env.URI_FIREBASE_RESIZE_IMAGE = 'https://us-central1-tuto-1115e.cloudfunctions.net/resizeImage';

process.env.PG_USER = 'inditex';
process.env.PG_HOST = 'localhost';
process.env.PG_PASSWORD = 'inditex';
process.env.PG_DATABASE = 'inditex';
process.env.PG_PORT = '5433';
