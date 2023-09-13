import express, { Request, Response } from 'express';
import Todo from './controllers/todo';


const router = express.Router();
export default router;


router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Api up and running!'
  });
});

const todo = new Todo();
router.get("/todos", todo.index);