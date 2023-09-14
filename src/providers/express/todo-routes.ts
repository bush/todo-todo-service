import express, { Request, Response } from "express";
import Todo from "../../controllers/todo";

const todo = express.Router();
export default todo;

todo.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "Api up and running!",
  });
});

todo.get("/todos", async (req: Request, res: Response) => {
  const todo = new Todo();
  const ret = await todo.index();
  res.json(ret);
});

todo.post("/todos", async (req: Request, res: Response) => {
  const todo = new Todo();
  const ret = await todo.create();
  res.end();
});
