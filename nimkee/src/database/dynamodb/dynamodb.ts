import { INimkeeRepo } from "../interface";

import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  QueryCommandInput,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";

import {
  AttributeDefinition,
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  KeySchemaElement,
  waitUntilTableExists,
} from "@aws-sdk/client-dynamodb";

enum Action {
  PUT = "PutRequest",
  DELETE = "DeleteRequest",
}

export type NimkeeDynamoDBTableInfo = {
  tableName: string;
  pkName: string;
  skName?: string;
}

// This is intened as a utility class to help with testing.
// Leaving this class intact for now but the another strategy is to use
// pulumi to create the table rather than writing our own logic for this
export class DynamoDBRepo implements INimkeeRepo {

  constructor(private client: DynamoDBClient, private docClient: DynamoDBDocumentClient, private tableInfo: NimkeeDynamoDBTableInfo) {}

  static async create(
    tableInfo: CreateTableCommandInput,
    client?: DynamoDBClient,
  ) {

    if (!client) {
      client = new DynamoDBClient({});
    }

    const docClient = DynamoDBDocumentClient.from(client);

    if (!tableInfo.TableName) {
      throw new Error("Tablename has not been specified");
    }
    
    const tableName = tableInfo.TableName;
    const schema = tableInfo.KeySchema;

    if (!schema) {
      throw new Error("Key schema not specified");
    }

    const pkName = schema.find((key) => key.KeyType === "HASH")?.AttributeName;

    if(!pkName) {
      
    }
    
    const skName = schema.find((key) => key.KeyType === "RANGE")?.AttributeName;
    
    // Create the table
    try {
      const createTableCommand = new CreateTableCommand(tableInfo);
      await docClient.send(createTableCommand);
      console.log(`Creating table ${tableName}...`);

      // Wait until the table is active
      await waitUntilTableExists(
        { client: docClient, maxWaitTime: 20 },
        { TableName: tableName }
      );
      console.log(`Table ${tableName} is active.`);
    } catch (error) {
      const err = error as any;
      if (err.name === 'ResourceInUseException') {
        console.log(`Table ${tableName} already exists.`);

      } else {
        throw err;
      }
    }

    const table = new DynamoDBRepo(client, docClient, {tableName, pkName, skName});
    return table as INimkeeRepo;
  }

  async empty() {
    const items = await this.scan();

    if (items.length === 0) {
      return;
    }

    const deleteItems = items.map((item) => {
      const deleteKey = { [this.tableInfo.pkName]: item[this.tableInfo.pkName] };
      if (this.tableInfo.skName) {
        deleteKey[this.tableInfo.skName] = item[this.tableInfo.skName];
      }

      return {
        DeleteRequest: {
          Key: deleteKey,
        },
      };
    });

    return this.batchWrite(deleteItems);
  }

  private async scan() {
    let input: ScanCommandInput = {
      TableName: this.tableInfo.tableName,
      ProjectionExpression: `${this.tableInfo.hashKey}, ${this.tableInfo.rangeKey}`,
    };
    let results: Record<string, any>[] = [];
    let lastKey;

    do {
      if (lastKey) {
        input.ExclusiveStartKey = lastKey;
      } else {
        delete input.ExclusiveStartKey;
      }

      const command = new ScanCommand(input);
      const { LastEvaluatedKey, Items } = await this.docClient.send(command);
      lastKey = LastEvaluatedKey;
      if (Items) {
        results.push(...Items);
      }
    } while (lastKey);

    return results;
  }

  private async describe() {
    const describeTableCommand = new DescribeTableCommand({
      TableName: this.tableInfo.tableName,
    });

    return this.client.send(describeTableCommand);
  }

  private async batchWrite(requestItems: Record<string, any>[]) {
    const chunkSize = 25;

    for (let i = 0; i < requestItems.length; i += chunkSize) {
      const chunk = requestItems.slice(i, i + chunkSize);

      let batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
          [this.tableInfo.tableName]: chunk,
        },
      });

      let result;
      result = await this.docClient.send(batchWriteCommand);
      let unProcessedItems = result.UnprocessedItems
        ? result.UnprocessedItems
        : {};
      let moreItems = Object.keys(unProcessedItems).length != 0;
      let retries = 3;

      while (moreItems && retries) {
        batchWriteCommand = new BatchWriteCommand({
          RequestItems: unProcessedItems,
        });

        result = await this.docClient.send(batchWriteCommand);
        console.log(result);
        unProcessedItems = result.UnprocessedItems
          ? result.UnprocessedItems
          : {};

        if (Object.keys(unProcessedItems).length != 0) {
          const delay = Math.floor(Math.random() * 2000 + 500);
          await new Promise((resolve) => setTimeout(resolve, delay));
          retries--;
        } else {
          moreItems = false;
        }
      }
    }
  }
}