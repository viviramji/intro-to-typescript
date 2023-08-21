import request from 'supertest';

import app from '../../app';

import { Todos } from './todo.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) { }
});

describe('GET /api/v1/todos', () => {
  it('responds with a todos list', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('length');
    expect(response.body.length).toBe(0);
  });
});

describe('POST /api/v1/todos', () => {
  it('responds with an error if the todo is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('message');
  });
});
