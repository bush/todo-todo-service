import { Entity, Service } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


const Todo = new Entity(
  {
    model: {
      entity: "todo",
      version: "1",
      service: "taskapp"
    },
    attributes: {
      id: {
        type: "string",
      },
      note: {
        type: "string",
        required: true
      },
      createdAt: {
        type: "number",
        default: () => Date.now(),
        // cannot be modified after created
        readOnly: true
      },
      updatedAt: {
        type: "number",
        // watch for changes to any attribute
        watch: "*",
        // set current timestamp when updated
        set: () => Date.now(),
        default: () => Date.now(),
        readOnly: true,
      }
    },
    indexes: {
      tasks: {
        pk: {
          field: "pk",
          composite: []
        },
        sk: {
          field: "sk",
          composite: ["id"]
        }
      },
    }
  }
);

type TodoItem = {
  id: string;
  note: string;
}

type TodoProvideCreateOptions = {
  id: string;
  note: string;
}

interface TodoStorageProvider {
  create(options: TodoProvideCreateOptions): Promise<TodoItem>;
}

class ElectroDBTodoStorage implements TodoStorageProvider {

  constructor(tableName: string, client: DynamoDBClient) {
    Todo.setTableName(tableName);
    Todo.setClient(client);
  }

  async create(options: TodoProvideCreateOptions) {
    const { note, id } = options;
    const result = await Todo.create({ note: note, id }).go();
    return result.data;
  }
}

describe("ElectroDB Tests", () => {
  it("should create a todo", async () => {
    const client = new DynamoDBClient({});
    const todoStorage = new ElectroDBTodoStorage('todo5', client);
    todoStorage.create({id: '123', note: 'implement feature'});
  });

});