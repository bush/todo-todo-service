import express, { Express, Request, Response, NextFunction } from "express";

import { ITodosController } from "./interface";
import { IMiddleware } from "../../common/express/express";


class TodosRouter implements IMiddleware {
  
  todoController: ITodosController;
  todoRouter = express.Router();

  constructor(todoController: ITodosController) {
    this.todoController = todoController;
  }

  public add(app: Express) {

    this.todoRouter.post(
      "/todos",
      async (req: Request, res: Response, next: NextFunction) => {   
          try {
            await this.todoController.create(req.body);
            res.send({ status: "success" }); 
          } catch (err) {
            next(err);
          }
      }
    );

    app.use("/api/v1", this.todoRouter);
  }
}

export default TodosRouter;
