// External libraries
//import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ITodoRepo } from "../interface";

// Local libraries
import { DocumentClient, Entity  } from "electrodb";
import { TodoItem } from "../interface";

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

class ElectroDBTodoStorage implements ITodoRepo {
  constructor(tableName: string, client?: DocumentClient) {
    Todo.setTableName(tableName);
    if(client) { Todo.setClient(client) };
  }

  async create(todo: TodoItem): Promise<void> {
    const { note, id } = todo;
    await Todo.create({ note: note, id }).go();
  }
}

export default ElectroDBTodoStorage;