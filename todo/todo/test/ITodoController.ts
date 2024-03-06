import { describe } from "mocha";
import { assert } from "chai";
import createContainer from "../../providers/container";
import { TodoItem } from "../interface";

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
      getAll: () => {
        return [todoItem];
      }
    };
  });

  before(() => { });
  after(() => { });

  it("Create a todo", async () => {
    const todo = c.TodoController;
    await todo.create(todoItem);
  });

  it("Gets all todos" , async () => {
    const todo = c.TodoController;
    const todos = await todo.getAll();
    assert.equal(todos.length, 1);
    assert.equal(todos[0].id, todoItem.id);
    assert.equal(todos[0].note, todoItem.note);
  });
});
