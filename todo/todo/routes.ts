import util from "util";
import { Application, Router, Request, Response, NextFunction } from "express";
import { INimkeeMiddleware } from "../../common/interface";
import { ITodoController } from "./interface";

// NOTE:
// This could be broken up to several classes, one for each route
// If we wanted to have true separation of routes for the serverless
// configuration we could break this apart and have a separate instance
// of the express app for each route.

class TodoRoutes implements INimkeeMiddleware {
  constructor(
    private app: Application,
    private router: Router,
    private controller: ITodoController
  ) {}

  private async test(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("TEST1");
      console.log(util.inspect(process.env, { depth: 10 }));
      res.send({ status: "success" });
    } catch (err) {
      next(err);
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.controller.create(req.body);
      res.send({ status: "success" });
    } catch (err) {
      next(err);
    }
  }

  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await this.controller.getAll();
      res.send(todos);
    } catch (err) {
      next(err);
    }
  }

  public mount() {
    // FIXME: Get the routes from configuration or at leave have a constant
    this.router.post("/todos", this.create.bind(this));
    this.router.get("/todos", this.getAll.bind(this));
    this.router.get("/test", this.test.bind(this));
    this.app.use("/api/v1", this.router);
  }
}

export default TodoRoutes;
