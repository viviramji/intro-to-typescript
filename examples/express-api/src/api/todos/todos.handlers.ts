import { Response, Request, NextFunction } from 'express';
import { TodoWithId, Todos } from './todo.model';

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {

  try {
    const result = await Todos.find();
    const todosFound = await result.toArray();
    return res.json(todosFound);
  } catch (error) {
    next(error);
  }

}
