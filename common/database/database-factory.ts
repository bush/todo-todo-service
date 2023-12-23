import { MongoClient, MongoClientOptions } from "mongodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import DynamoDB from "./dynamodb/table";

export interface NimkeeDBOptions {
  [key: string]: any;
}

export type NimkeeDBClient = MongoClient | DynamoDBClient;

class Database {
  static create(
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

export default Database;
