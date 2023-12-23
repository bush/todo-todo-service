// External Libraries
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Local Libraries
import ElectroDBTodoStorage from "./electrodb/electrodb";
import DatabaseFactory, {
} from "../../common/database/database-factory";

type TodoItem = {
  id: string;
  note: string;
};

export type TodoProviderCreateOptions = {
  id: string;
  note: string;
};

export interface TodoStorageProvider {
  create(options: TodoProviderCreateOptions): Promise<TodoItem>;
}

class StorageProviderFactory {
  static create(strategy: string): TodoStorageProvider {
    let client = DatabaseFactory.create("dynamodb", "dynamodb", {
      region: "us-east-1",
    });

    let result: TodoStorageProvider;

    switch (strategy) {
      case "dynamodb":
      case "electrodb":
        client = DatabaseFactory.create("dynamodb", "dynamodb", {
          region: "us-east-1",
        });
      case "electrodb":
        result = new ElectroDBTodoStorage(
          client as unknown as DynamoDBClient,
          "todo5"
        );
        break;
      default:
        result = new ElectroDBTodoStorage(
          client as unknown as DynamoDBClient,
          "todo5"
        );
    }

    return result;
  }
}

export default StorageProviderFactory;
