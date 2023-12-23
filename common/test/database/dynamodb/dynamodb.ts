import { describe } from "mocha";
import DynamoDB from "../../../database/dynamodb/table";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

let assert = require("assert");

describe("DynamoDB Support Library Tests", () => {
  let dynamodbTable: DynamoDB;

  before(async function () {
    this.timeout(10000);
    await DynamoDB.deleteTable("test");
  });

  it("Create a table", async function () {
    this.timeout(10000);
    dynamodbTable = await DynamoDB.init("test5", "nimkeePK", "nimkeeSK");
  });

  it("insert many documents", async function () {
    this.timeout(10000);
    
    const documents = [
      {
        nimkeePK: "123",
        nimkeeSK: "test",
        description: "test description",
      },
      {
        nimkeePK: "123",
        nimkeeSK: "test2",
        description: "test description2",
      },
    ];
   
    const results = await dynamodbTable.batchWrite(documents);
    console.log(results);
  });
  
});
