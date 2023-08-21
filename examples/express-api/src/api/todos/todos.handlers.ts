import { Response, Request, NextFunction } from 'express';
import { Todo, TodoWithId, Todos } from './todo.model';

export async function findAll(
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction,
) {

  try {
    const result = await Todos.find();
    const todosFound = await result.toArray();
    return res.json(todosFound);
  } catch (error) {
    next(error);
  }

}

export async function createOne(
  req: Request<{}, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction,
) {

  try {
    const insertResult = await Todos.insertOne(req.body);
    
    if (!insertResult.acknowledged) throw new Error('Error inserting todo item.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }

}