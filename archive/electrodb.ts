import { pkName, skName } from "./dynamodb";

// External libraries
//import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ITodoRepo } from "../interface";

// Local libraries
import { DocumentClient, Entity, Attribute } from "electrodb";
import { TodoItem } from "../interface";
import { ElectroDBMapperConfig } from "../../config";

const model = {
  entity: "todo",
  version: "1",
  service: "taskapp",
};

const indexes = {
  tasks: {
    pk: {
      field: pkName,
      composite: [],
    },
    sk: {
      field: skName,
      composite: ["id"],
    },
  },
};

const attributes: { readonly [x: string]: Attribute } = {
  id: {
    type: "string",
  },
  note: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: "number",
    default: () => Date.now(),
    // cannot be modified after created
    readOnly: true,
  },
  updatedAt: {
    type: "number",
    // watch for changes to any attribute
    watch: "*",
    // set current timestamp when updated
    set: () => Date.now(),
    default: () => Date.now(),
    readOnly: true,
  },
};

class ElectroDBTodoStorage implements ITodoRepo {
  private todo: Entity<
    string,
    string,
    string,
    {
      model: typeof model;
      attributes: typeof attributes;
      indexes: typeof indexes;
    }
  >;

  constructor(config: ElectroDBMapperConfig, client?: DocumentClient) {


    this.todo.setTableName(config.tableName);
    if (client) {
      this.todo.setClient(client);
    }
  }

  async create(todo: TodoItem): Promise<void> {
    const { note, id } = todo;
    await this.todo.create({ id, note }).go();
  }

  async getAll(): Promise<TodoItem[]> {
    const todos = await this.todo.query.tasks({}).go();
    const todoItems = todos.data.map((todo: any) => {
      return { id: todo.id, note: todo.note };
    });

    return todoItems;
  }
}

export default ElectroDBTodoStorage;
