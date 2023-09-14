import Todo from "../../controllers/todo";

let assert = require("assert");

describe("Todo Controller", () => {
  it("should call create", async () => {
    const todo = new Todo();
    let result = await todo.create();
  });

  it("should call index", async () => {
    const todo = new Todo();
    let result = await todo.index();
    assert.equal(result[0].todo, "this");
  });
});
