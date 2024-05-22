import sinon from "sinon";
import { assert } from "chai";
import { describe } from "mocha";

import createContainer from "../../providers/container";

describe("Todo Controller", () => {
  const c = createContainer();
  const todo = c.TodoController;
  const todoItem = {
    id: "abc",
    note: "this this abc note",
  };

  before(() => {});
  after(() => {});
  afterEach(() => {
    sinon.restore();
  });

  it("Create a todo", async () => {
    const fake = sinon.replace(todo, "create", sinon.fake.resolves(null));
    await todo.create(todoItem);
  });

  it("Gets all todos", async () => {
    const fake = sinon.replace(todo, "getAll", sinon.fake.resolves([todoItem]));
    const todos = await todo.getAll();
    assert.equal(todos.length, 1);
    assert.equal(todos[0].id, todoItem.id);
    assert.equal(todos[0].note, todoItem.note);
  });
});
