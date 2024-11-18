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
} from "@aws-sdk/client-dynamodb";

enum Action {
  PUT = "PutRequest",
  DELETE = "DeleteRequest",
}

// This is intened as a utility class to help with testing.
// Leaving this class intact for now but the another strategy is to use
// pulumi to create the table rather than writing our own logic for this
export class DynamoDBRepo implements INimkeeRepo {

  constructor(private attributes: {
    client: DynamoDBClient;
    docClient: DynamoDBDocumentClient;
    tableName: string;
    hashKey: string;
    rangeKey?: string;
  }) {
    this.attributes.tableName = attributes.tableName;
    this.attributes.hashKey = attributes.hashKey;
    this.attributes.rangeKey = attributes.rangeKey || undefined;
  }

  static async create(
    tableInfo: CreateTableCommandInput,
    client?: DynamoDBClient,
    docClient?: DynamoDBDocumentClient
  ) {

    if (!client) {
      client = new DynamoDBClient({});
    }

    if (!docClient) {
      docClient = DynamoDBDocumentClient.from(client);
    }

    if (!tableInfo.TableName) {
      throw new Error("Tablename has not been specified");
    }

    if (!tableInfo.TableName) {
      throw new Error("Table name not specified");
    }
    const tableName = tableInfo.TableName;
    const createTableCommand = new CreateTableCommand(tableInfo);
    let active = false;
    await client.send(createTableCommand);

    const table = new DynamoDBRepo({
      client,
      docClient,
      tableName: tableName,
      hashKey: "",
      rangeKey: "",
    });

    let result = await table.describe();

    active = result.Table?.TableStatus === "ACTIVE" ? true : false;
  
    while (result.Table?.TableStatus === "CREATING") {
      await new Promise((res) => setTimeout(res, 1000));
      result = await table.describe();
    }

    return table as INimkeeRepo;
  }

  async empty() {
    const items = await this.scan();

    if (items.length === 0) {
      return;
    }

    const deleteItems = items.map((item) => {
      const deleteKey = { [this.attributes.hashKey]: item[this.attributes.hashKey] };
      if (this.attributes.rangeKey) {
        deleteKey[this.attributes.rangeKey] = item[this.attributes.rangeKey];
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
      TableName: this.attributes.tableName,
      ProjectionExpression: `${this.attributes.hashKey}, ${this.attributes.rangeKey}`,
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
      const { LastEvaluatedKey, Items } = await this.attributes.docClient.send(command);
      lastKey = LastEvaluatedKey;
      if (Items) {
        results.push(...Items);
      }
    } while (lastKey);

    return results;
  }

  private async describe() {
    const describeTableCommand = new DescribeTableCommand({
      TableName: this.attributes.tableName,
    });

    return this.attributes.client.send(describeTableCommand);
  }

  private async batchWrite(requestItems: Record<string, any>[]) {
    const chunkSize = 25;

    for (let i = 0; i < requestItems.length; i += chunkSize) {
      const chunk = requestItems.slice(i, i + chunkSize);

      let batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
          [this.attributes.tableName]: chunk,
        },
      });

      let result;
      result = await this.attributes.docClient.send(batchWriteCommand);
      let unProcessedItems = result.UnprocessedItems
        ? result.UnprocessedItems
        : {};
      let moreItems = Object.keys(unProcessedItems).length != 0;
      let retries = 3;

      while (moreItems && retries) {
        batchWriteCommand = new BatchWriteCommand({
          RequestItems: unProcessedItems,
        });

        result = await this.attributes.docClient.send(batchWriteCommand);
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