import path from 'path';
import request from '../../../../tests/utils/request';

let idTask;

describe('POST /task', () => {
  it('Should return an error, Expected a file but got nothing', async () => {
    const response = await request({
      url: `/task`,
      method: 'POST',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].description).toBe('Expected a file but got nothing');
  });
  it('upload image and create task', async () => {
    const response = await request({
      url: `/task`,
      method: 'POST',
    }).attach('fieldName', path.resolve(__dirname, 'files-examples', 'hyundai.jpg'));

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      image: 'http:/127.0.0.1/hyundai/hyundai.jpg',
    });
    idTask = response.body.id;
  });
  it('Should return an error, upload a non image file', async () => {
    const response = await request({
      url: `/task`,
      method: 'POST',
    }).attach('fieldName', path.resolve(__dirname, 'files-examples', 'notAnImageFile.xlsx'));

    expect(response.statusCode).toBe(400);
  });
});

describe('GET /task/:idTask', () => {
  it('get task detail by idTask', async () => {
    const response = await request({
      url: `/task/${idTask}`,
      method: 'GET',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      task: {
        id: idTask,
      },
    });
  });
  it('should return an error, idTask not have a valid format', async () => {
    const response = await request({
      url: `/task/123`,
      method: 'GET',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].description).toBe(
      'Could not validate schema in middleware. ValidationError: "params.taskId" length must be at least 36 characters long',
    );
  });
  it('should return an error, idTask not found', async () => {
    const response = await request({
      url: `/task/99999999-9999-9999-9999-999999999999`,
      method: 'GET',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.errors[0].description).toBe('Task id 99999999-9999-9999-9999-999999999999 not found');
  });
});
