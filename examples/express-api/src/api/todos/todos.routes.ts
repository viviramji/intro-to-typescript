import { Router, Response, Request } from 'express';
import { TodoWithId, Todos } from './todo.model';

const router = Router();

router.get('/', async (req: Request, res: Response<TodoWithId[]>) => {
  const result = Todos.find();
  const todosFound = await result.toArray();
  res.json(todosFound);
});

export default router;
