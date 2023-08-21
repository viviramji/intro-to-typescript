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
      .expect(422);
    expect(response.body).toHaveProperty('message');
  });
  
  it('responds with inserted object', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('done');
    expect(response.body.content).toBe('Learn TypeScript');
  });
});
