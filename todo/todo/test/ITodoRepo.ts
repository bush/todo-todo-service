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

import sinon from "sinon";
import util from "util";

import { describe } from "mocha";
import { assert } from "chai";
import createContainer from "../../providers/container";
import { ITodoController, TodoItem } from "../interface";
import { NimkeeDBType } from "../../../common/interface";

const fake = false;
const database = NimkeeDBType.DYNAMODB;
const tableName = 'todo-storage-test';

function liveDBConfig(db: string) {

}

describe("Todo Controller", () => {

  const todoItem = {
    id: 'abc',
    note: 'this this abc note'
  }

  const c = createContainer();
  let todo: ITodoController;

  before(() => {
    const config = c.config;
    if(!fake) {
      config.app.todo.storage.database.type = database;
      config.app.todo.storage.mapper.config.tableName = tableName;
    }
    todo = c.TodoController;
    console.log(util.inspect(config, {depth: 10}));
  });

  after(() => { });
  afterEach(() => { 
    sinon.restore();
  });

  it("Creates a todo", async () => {
    if(fake) {
      sinon.replace(todo, "create", sinon.fake.resolves(null));
    }
    await todo.create(todoItem);
  });

  it("Gets all todos" , async () => {
    if(fake) {
      sinon.replace(todo, "getAll", sinon.fake.resolves([todoItem]));
    }
    
    const todos = await todo.getAll();
    console.log(todos);
    //assert.equal(todos.length, 1);
    //assert.equal(todos[0].id, todoItem.id);
    //assert.equal(todos[0].note, todoItem.note);
  });
});