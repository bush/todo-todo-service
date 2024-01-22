import { MongoClient } from "mongodb";
import { DocumentClient } from "electrodb";

export type DynamoDBOptions = {

}

export type MongoDBOptions = {
  url: string
}

export type NimkeeDBOptions = DynamoDBOptions | MongoDBOptions;

export type NimkeeDBStrategy = {
  db: string,
  options?: NimkeeDBOptions
}

export enum NimkeeDBStorageMapper {
  DYNAMODB,
  ELECTRODB,
  MONGODB,
  MONGOOSE
}

export type ElectroDBMapperConfig = {
  tableName: string;
}

export type NimkeeDBMapperConfig = ElectroDBMapperConfig;
export type NimkeeDBClient = DocumentClient // | Whatever mongoose uses

export type NimkeeDBMapperStrategy = {
  storageMapper: NimkeeDBStorageMapper;
  config: NimkeeDBMapperConfig; 
  client?: NimkeeDBClient;
}
