import { MongoClient, MongoClientOptions } from "mongodb";
import { DocumentClient } from "electrodb";

export enum NimkeeDBType {
  DYNAMODB='dynamodb',
  MONGODB='mongodb'
}

export type DynamoDBConfig = {

}

export type MongoDBConfig = {
  url: string,
  options?: MongoClientOptions
}

export type NimkeeDBConfig = DynamoDBConfig | MongoDBConfig;

export type NimkeeDBStrategy = {
  client: string,
  config?: NimkeeDBConfig
}

export type NimkeeDBClient = DocumentClient // | Whatever mongoose uses

