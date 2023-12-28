// External libraries
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Local libraries
import { Entity  } from "electrodb";
import { TodoProviderCreateOptions, TodoStorageProvider } from "../storage-factory";

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

class ElectroDBTodoStorage implements TodoStorageProvider {
  constructor(client: DynamoDBClient, tableName: string) {
    Todo.setTableName(tableName);
    Todo.setClient(client);
  }

  async create(options: TodoProviderCreateOptions) {
    const { note, id } = options;
    await Todo.create({ note: note, id }).go();
  }
}

export default ElectroDBTodoStorage;