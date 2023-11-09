import fs from "fs";
import path from "path";
import logger from "../../logging/logger";
import { INimkeeDBClient, INimkeeDB } from "../interface";
import Collection from "./collection";
import Db from "./db";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Nimkee database client for dynamodb
class Client implements INimkeeDBClient {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;
  private url: string;

  constructor(url: string, options?: any) {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.url = url;
  }

  public db(dbName?: string, options?: any): INimkeeDB {
    logger.info(`client creating database: ${dbName}`);
    dbName = dbName ? dbName : path.basename(this.url);
    return new Db(this, dbName, options);
  }

  public close(): any {}
}

export default Client;
