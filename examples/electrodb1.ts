import { Entity, Service } from "electrodb";
import { ITodoRepo } from "../todo/src/todo/interface";
import { ElectroDBMapperConfig, TodoItem } from "../todo/src/todo/interface";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const table = "todo-storage-test";
const client = new DynamoDBClient({ region: "us-east-1" });
export const pkName = "pk";
export const skName = "sk";

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
  },
  { client,table }
);

async function main() {
  await Todo.create({
    id: "123",
    note: "this this abc note",   
  }).go();
}

main();