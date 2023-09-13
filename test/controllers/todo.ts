import exp from "constants";
import Todo from "../../controllers/todo";
import express, { Request, Response, NextFunction } from "express";

let assert = require("assert");

const req: Request = {} as Request;
const res: Response = {} as Response;
const next: NextFunction = {} as NextFunction;

describe("Todo Controller", () => {
  it("should call create", async () => {
    const todo = new Todo();
    let result = await todo.create(req, res, next);
    assert.equal(result.status, "success");
  });

  it("should call index", async () => {
    const todo = new Todo();
    let result = await todo.index(req, res, next);
    assert.equal(result.status, "success");
  });
});
