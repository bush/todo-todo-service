import stack from './stack.json'

import createContainer from "../../providers/container";
import { ITodoController, TodoItem } from "../interface";
import { NimkeeDBType } from "../../../common/interface";


const c = createContainer();

const database = NimkeeDBType.DYNAMODB;
const tableName = stack.tableName;
const config = c.config;
config.app.todo.storage.database.type = database;
config.app.todo.storage.mapper.config.tableName = tableName;

const todo = c.TodoController;


const todoItem = {
  id: 'abc1',
  note: 'this this abc note'
}


async function main() {
  await todo.create(todoItem);
  const todos = await todo.getAll();
  console.log(todos);
}

main()

