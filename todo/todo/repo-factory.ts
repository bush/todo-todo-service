// External Libraries
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Local Libraries
import ElectroDBTodoStorage from "./electrodb/electrodb";
import { IDatabaseFactory } from "../../common/database/interface";
import { ITodoRepo } from "./interface";

class TodoRepoFactory {
  private dbFactory: IDatabaseFactory;

  constructor(dbFactory: IDatabaseFactory) {
    this.dbFactory = dbFactory;
  }
  
  create(strategy: string): ITodoRepo {
    let client = this.dbFactory.create("dynamodb", "dynamodb", {
      region: "us-east-1",
    });

    let result: ITodoRepo;

    switch (strategy) {
      case "dynamodb":
      case "electrodb":
        client = this.dbFactory.create("dynamodb", "dynamodb", {
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

export default TodoRepoFactory;
