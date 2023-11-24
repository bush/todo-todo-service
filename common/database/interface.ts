
import {
  MongoClient,
  Db as MongoDB,
  Collection as MongoCollection,
} from "mongodb";

export interface INimkeeDocDBDocument {
  [key: string]: any;
}

export interface INimkeeDocDBClient {
  readonly client: any;
  db():INimkeeDocDB;
  close(): any;
}

export interface NimkeeDocDBOptions {
  [key: string]: any;
} 

export interface NimkeeDocDBDynamoDBCollectionOptions {
  [key: string]: any;
}

export interface NimkeeDocDBCollectionOptions {
  [key: string]: any;
}

export interface INimkeeDocDB {
  readonly client: INimkeeDocDBClient;
  collection(name: string, options?: NimkeeDocDBCollectionOptions): any;
}

export interface INimkeeDocDBCollection {
  insertMany(documents: INimkeeDocDBDocument[]): any;
  drop(): any;
  find(): any;
}

export type NimkeeDocDBClient = MongoClient | INimkeeDocDBClient;
export type NimkeeDocDB = INimkeeDocDB | MongoDB;
export type NimkeeDocDBCollection = INimkeeDocDBCollection | MongoCollection;
//export type NimkeeDBDocument = Document;