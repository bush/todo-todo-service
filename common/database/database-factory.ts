import { MongoClient } from "mongodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { NimkeeDBStrategy, MongoDBOptions } from "./interface";


class DatabaseFactory {
  static create(strategy: NimkeeDBStrategy) {
    switch (strategy.db) {
      case "dynamodb":
        return new DynamoDBClient({});
      case "mongo":
        const options = strategy.options as MongoDBOptions;
        return new MongoClient(options.url);
      default:
        return new DynamoDBClient({});
    }
  }
}

export default DatabaseFactory;
