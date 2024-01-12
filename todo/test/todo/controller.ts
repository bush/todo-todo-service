import { describe } from "mocha";
import StorageProviderFactory from "../../todo/repo-factory";
import Todo from "../../todo/controller";

let assert = require("assert");

describe("Todos Controller", () => {
  const storageProvider = StorageProviderFactory.create("dynamodb");
  const todo = new Todo(storageProvider);

  it("Create a todo", async () => {
    todo.create({ id: "abc", note: "this this abc note" });
  });
});
