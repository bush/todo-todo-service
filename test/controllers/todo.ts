import { TodoController } from "../../controllers/todo";

let assert = require("assert");
describe("Todo Controller", () => {
  it("should call create", async () => {
    let todo = new TodoController();
    let res = await todo.create({});
    assert.equal(res.status, "success");
  });
});
