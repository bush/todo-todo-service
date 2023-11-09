import { MongoClient, MongoClientOptions } from 'mongodb';
import { NimkeeDBClient } from './interface';
import  DynamodbClient  from "./dynamodb/client";

class Database {
  static create(strategy: string, url: string, options?: any ): NimkeeDBClient {
    switch (strategy) {
      case 'dynamodb':
        return new DynamodbClient(url);
      case 'mongo':
          return new MongoClient(url, options as MongoClientOptions);
        
      default:
        return new DynamodbClient(url);
    }
  }
}

export default Database;