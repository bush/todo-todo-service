// One methodology could be that we test all the supported databases
// This could be more used as a driver to check that data is inserted and retrieved
// as expected in the various databases.
// So add something and get something back.  There is not much interest to test third party
// libraries.  We are more interested in the integration of the third party libraries.

// TODO:
// Currently the idea is to use these test(s) to drive the development of database accesses.
// For now I will manually deploy and destroy a test table with the serverless database
// deployment. Once I investigate more options around other tooling such as sst and pulumi
// I can further automate this process as part of these tests.  In general I feel that
// unit tests are a great way to drive new development as a harness to bootstrap and test code
// as its being developed.  Its not true TDD but close to it - I am not a TDD purist.

import util from "util";

//import {
//  AttributeDefinition,
//  KeySchemaElement,
//} from '@aws-sdk/client-dynamodb';

import AWS from "aws-sdk";

import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  waitUntilTableExists,
  waitUntilTableNotExists,
  ScalarAttributeType,
  KeyType,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

import { expect } from "chai";

const REGION = 'us-east-1'; // Change to your desired region

// Create DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region: REGION });

// Create DynamoDB Document client
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);


//import { DynamoDBRepo } from 'nimkee';

import { describe } from "mocha";
import { assert } from "chai";
import createContainer from "../../src/providers/container";
import { ITodoRepo, TodoItem } from "../../src/todo/interface";

//import { NimkeeDBType } from "nimkee";
// symlinks are broken in intellisense
import { NimkeeDBType } from "../../node_modules/nimkee";

const database = NimkeeDBType.DYNAMODB;
const tableName = "todo-storage-test";
const pkName = "pk";
const skName = "sk";

describe("Todo Repo Tests", async () => {
  const c = createContainer();
  c.config.app.todo.database.type = NimkeeDBType.DYNAMODB;
  c.config.app.todo.database.mapper.config.electrodb.tableName = tableName;
  const todoRepo = c.TodoRepo;

  console.log(util.inspect(c.config, { depth: 10 }));
  
  const todoItem = {
    id: "123",
    note: "this this abc note",
  };

  before(async () => {
    
    const params = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: pkName, KeyType: KeyType.HASH },
        { AttributeName: skName, KeyType: KeyType.RANGE },
      ],
      AttributeDefinitions: [
        { AttributeName: pkName, AttributeType: ScalarAttributeType.S },
        { AttributeName: skName, AttributeType: ScalarAttributeType.S },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    // Create the table
    try {
      const createTableCommand = new CreateTableCommand(params);
      await dynamoDBClient.send(createTableCommand);
      console.log(`Creating table ${tableName}...`);

      // Wait until the table is active
      await waitUntilTableExists(
        { client: dynamoDBClient, maxWaitTime: 20 },
        { TableName: tableName }
      );
      console.log(`Table ${tableName} is active.`);
    } catch (error) {
      const err = error as any;
      if (err.name === 'ResourceInUseException') {
        console.log(`Table ${tableName} already exists.`);
      } else {
        throw err;
      }
    }

   
  });

  //const todoRepo = await DynamoDBRepo.create(tableInfo);

  afterEach(async () => {
    //await todoRepo.empty();
  });

  it("Creates a todo and reads it", async () => {
    console.log("TODO ITEM:");
    console.log(todoItem);
    await todoRepo.create(todoItem);
    //const todos = await todoRepo.getAll();
    //console.log(todos);
    //assert.equal(todos.length, 1);
    //assert.equal(todos[0].id, todoItem.id);
    //assert.equal(todos[0].note, todoItem.note);
  });
});
