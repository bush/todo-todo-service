import express, { Request, Response } from "express";
import Todo from "./controller";

const todo = express.Router();
export default todo;

todo.post("/todos", async (req: Request, res: Response) => {
  console.log("POST /todos");
  //const todoController = req.app.locals.todoController;
  //const id = req.body.id;
  //const note = req.body.note;
  //const ret = await todoController.create({ id, note });
  //res.end();
});
