import { describe } from "mocha";
import { assert } from "chai";
import createContainer from "../../providers/container";
import { TodoItem } from "../../todo/interface";

describe("Todo Controller", () => {

  const todoItem = {
    id: 'abc',
    note: 'this this abc note'
  }

  const c = createContainer();
  c.service("TodoRepo", (c) => {
    return {
      create: (todo: TodoItem) => {
        assert.equal(todo.id, todoItem.id);
        assert.equal(todo.note, todoItem.note);
      },
    };
  });

  before(() => { });
  after(() => { });

  it("Create a todo", async () => {
    const todo = c.TodoController;
    await todo.create(todoItem);
  });
});
