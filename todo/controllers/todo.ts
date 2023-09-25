import { Request, Response, NextFunction } from "express";

class Todo {
  constructor() {}

  public async index(): Promise<any> {
    console.log("Todo index.");
    return [{ todo: 'this' }, { todo: 'that' }];
  }

  public async create(): Promise<any> {
    console.log("Created todo.");
    return;
  }
}

export default Todo;
