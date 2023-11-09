import { MongoClient, Db as MongoDB, Collection as MongoCollection } from 'mongodb';

export interface INimkeeDB {
  collection(collectionName: string): any;
}

export interface INimkeeDBClient {
  db(): INimkeeDB;
  close(): any;
};


export interface INimkeeDBCollection {
  insertMany(): any;
  drop(): any;
  find(): any;  
};

export type NimkeeDBClient = MongoClient | INimkeeDBClient;
export type NimkeeDB = INimkeeDB | MongoDB;
export type NimkeeDBCollection = INimkeeDBCollection | MongoCollection;

