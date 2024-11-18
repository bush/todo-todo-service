import { pkName, skName } from "./dynamodb";
import { ITodoRepo } from "../../interface";
import { NimkeeElectroDBConfig } from "nimkee";

// Local libraries
import { DocumentClient, Entity } from "electrodb";
import { TodoItem } from "../../interface";

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
          field: pkName,
          composite: []
        },
        sk: {
          field: skName,
          composite: ["id"]
        }
      },
    }
  }
);

class ElectroDBTodoRepo implements ITodoRepo {


  constructor(config: NimkeeElectroDBConfig, client?: DocumentClient) {
    console.log(`Table Name: ${config.tableName}`)
    Todo.setTableName(config.tableName);
    if (client) {
      Todo.setClient(client);
    }
  }

  async create(todo: TodoItem): Promise<void> {
    const { note, id } = todo;
    await Todo.create({ id, note }).go();
  }

  async getAll(): Promise<TodoItem[]> {
    const todos = await Todo.query.tasks({}).go();
    const todoItems = todos.data.map((todo: any) => {
      return { id: todo.id, note: todo.note };
    });

    return todoItems;
  }
}

export default ElectroDBTodoRepo;
