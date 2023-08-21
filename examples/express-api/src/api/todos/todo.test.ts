import request from 'supertest';

import app from '../../app';

import { Todos } from './todo.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) { }
});

let id = '';

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
    id = response.body._id;
  });

});

describe('GET /api/v1/todos/:id', () => {
  it('responds with a single todo', async () => {
    const response = await request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('done');
    expect(response.body._id).toBe(id);
    expect(response.body.content).toBe('Learn TypeScript');
  });

  it('responds with a with invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/todos/blabla')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a with no found error', (done) => {
    request(app)
      .get('/api/v1/todos/64e2dcfd22a184d9ead2e623')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  describe('PUT /api/v1/todos/:id', () => {
    it('responds with a with invalid ObjectId error', (done) => {
      request(app)
        .put('/api/v1/todos/blabla')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    });

    it('responds with a with no found error', (done) => {
      request(app)
        .put('/api/v1/todos/64e2dcfd22a184d9ead2e623')
        .set('Accept', 'application/json')
        .send({
          content: 'Learn TypeScript',
          done: true,
        })
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('responds with an update single todo', async () => {
      const response = await request(app)
        .put(`/api/v1/todos/${id}`)
        .set('Accept', 'application/json')
        .send({
          content: 'New changes',
          done: true,
        })
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('done');
      expect(response.body._id).toBe(id);
      expect(response.body.done).toBe(true);
      expect(response.body.content).toBe('New changes');
    });
  });

});