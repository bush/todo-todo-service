import { MongoClient, MongoClientOptions } from 'mongodb';
import { Client as DynamoDBClient } from './dynamodb/client';
import { NimkeeDocDBClient } from './interface';

class Database {
  static create(strategy: string, url: string, options?: any ): NimkeeDocDBClient {
    switch (strategy) {
      case 'dynamodb':
        return new DynamoDBClient(url);
      case 'mongo':
          return new MongoClient(url, options as MongoClientOptions);
        
      default:
        return new DynamoDBClient(url);
    }
  }
}

export default Database;