import { describe } from "mocha";
import DatabaseFactory from "../../database/databaseFactory";
import dbData from "./db.json";
import { NimkeeDocDBClient, NimkeeDocDB, NimkeeDocDBCollection } from "../../database/interface";

interface Pet {
  name: string;
  age: number;
}

const databases = [
  {
    name: 'dynamodb',
    options: { url: "db", dbName: "todo" },
  },
  {
    name: 'mongo',
    options: { url: "mongodb://root:example@localhost:27017", dbName: "todo" },
  }
];

const dbInfo = databases[0];

describe(`Database Adapter: ${dbInfo.name}`, () => {

  let database: NimkeeDocDB;
  let client: NimkeeDocDBClient;
  let collection: NimkeeDocDBCollection;

  before(async () => {
    client = DatabaseFactory.create(dbInfo.name, dbInfo.options.url);
    database = client.db("todo1");
    collection = await database.collection("todo", { pkName: "last_name"} );
    const result = await collection.insertMany(dbData);
    console.log('Inserted documents =>', result);
  });

  after(async () => {
    //await collection.drop();
    //client.close();
  });

  it("Find a document", async () => {
    //const result = await collection.find({}).toArray();
    //console.log("Found documents =>", result);
  });
});
