import { Request, Response, NextFunction } from "express";

class TodoController {
  constructor() {}

  public async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log("Todo index.");
    res.json([{ todo: 'this' }, { todo: 'that' }]);
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log("Created todo.");
    return { status: "success", code: 201 };
  }
}

export default TodoController;
