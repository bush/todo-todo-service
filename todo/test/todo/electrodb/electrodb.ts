import { Entity } from "electrodb";
import DatabaseFactory from "../../../../common/database/database-factory";
import StorageProviderFactory from "../../../todo/storage-factory";


describe("Todo Access Patterns with ElectroDB", () => {

  // All this is being done at app init time
  const storageProvider = StorageProviderFactory.create('electrodb');

  before(async function () {
   
  });

  it("Create a todo", async () => {
    storageProvider.create({ id: "123456", note: "this is another node" });
  });
});