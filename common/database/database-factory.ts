import { MongoClient } from "mongodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IDatabaseFactory, NimkeeDBClient, NimkeeDBOptions } from "./interface";

class DatabaseFactory implements IDatabaseFactory {
  create(
    strategy: string,
    url: string,
    options?: NimkeeDBOptions
  ): NimkeeDBClient {
    switch (strategy) {
      case "dynamodb":
        return new DynamoDBClient({});
      case "mongo":
        return new MongoClient(url, options);
      default:
        return new DynamoDBClient({});
    }
  }
}

export default DatabaseFactory;
