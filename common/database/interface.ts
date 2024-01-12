import { MongoClient } from "mongodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface NimkeeDBOptions {
  [key: string]: any;
}

export type NimkeeDBClient = MongoClient | DynamoDBClient;

export interface IDatabaseFactory {
  create(strategy: string, url: string, options?: any): any;
}