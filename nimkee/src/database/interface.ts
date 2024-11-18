import { MongoClient, MongoClientOptions } from "mongodb";
import { DocumentClient } from "electrodb";

/**
 * @public
 */
export enum NimkeeDBType {
  DYNAMODB='dynamodb',
  MONGODB='mongodb'
}

/**
 * @public
 */
export enum NimkeeDBMapperType {
  DYNAMODB='dynamodb',
  ELECTRODB='electrodb',
  MONGODB='mongodb',
  MONGOOSE='mongoose'
}

/**
 * @public
 */
export type NimkeeElectroDBConfig = {
  tableName: string
}

/**
 * @public
 */
export type NimkeeMongooseConfig = {}

/**
 * @public
 */
export type NimkeeDBMapperConfig = {
  electrodb: NimkeeElectroDBConfig,
  mongoose: NimkeeMongooseConfig
}

/**
 * @public
 */
export type DynamoDBConfig = {

}

/**
 * @public
 */
export type MongoDBConfig = {
  url: string,
  options?: MongoClientOptions
}

/**
 * @public
 */
export type NimkeeDBConfig = DynamoDBConfig | MongoDBConfig;

/**
 * @public
 */
export type NimkeeDBStrategy = {
  client: string,
  config?: NimkeeDBConfig
}

/**
 * @public
 */
export type NimkeeRepo = string; // | Whatever mongoose uses


// This is notably a testing interface, meaning that it can be used to
// run tests against any supported database and have the ability to reset
// the database to a known state.  Its meant to be a generic "repo" interface
// such that we don't care about the underlying database, just that it can
// store and retrieve data.
/**
 * @public
 */
export interface INimkeeRepo {
  empty(): Promise<void>;
}

/**
 * @public
 */
export type NimkeeDBClient = DocumentClient // | Whatever mongoose uses

