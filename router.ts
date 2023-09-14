import express, { Request, Response } from "express";
import Todo from "./controllers/todo";

const router = express.Router();
export default router;

router.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "Api up and running!",
  });
});

router.get("/todos", async (req: Request, res: Response) => {
  const todo = new Todo();
  const ret = await todo.index();
  res.json(ret);
});

router.post("/todos", async (req: Request, res: Response) => {
  const todo = new Todo();
  const ret = await todo.create();
  res.end();
});
