import { describe } from "mocha";
import Database from "../../database/database";


describe("Basic Local Database Tests", () => {
  it("Create a database", async () => {
    const database = Database.create("basic-local", { url: "mongodb://localhost:27017/test" });
  });
});