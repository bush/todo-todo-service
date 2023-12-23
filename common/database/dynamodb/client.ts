import fs from "fs";
import path from "path";
import logger from "../../logging/logger";
import { INimkeeDocDBClient, INimkeeDocDB, NimkeeDocDBOptions } from "../interface";
import Collection from "./collection";
import Db from "./db";
import { DynamoDBClient, DescribeTableCommand, CreateTableCommand, CreateTableCommandInput, ScalarAttributeType, KeySchemaElement, AttributeDefinition } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// TODO: add options
export interface NimkeeDocDBClientOptions {}

// Nimkee database client for dynamodb
export class Client implements INimkeeDocDBClient {
  readonly client: DynamoDBDocumentClient;
  private url: string;

  constructor(url: string, options?: NimkeeDocDBClientOptions) {
    const client = new DynamoDBClient({});
    this.client = DynamoDBDocumentClient.from(client);
    this.url = url;
  }

  db(dbName?: string, options?: NimkeeDocDBOptions): INimkeeDocDB {
    logger.info(`client creating database: ${dbName}`);
    dbName = dbName ? dbName : path.basename(this.url);
    return new Db(this, dbName, options);
  }

  public close(): any {
    logger.info(`client closing`);
  }
}
