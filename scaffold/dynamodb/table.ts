import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  QueryCommandInput,
  QueryCommand,
  ScanCommand,
  ScanCommandInput
} from "@aws-sdk/lib-dynamodb";

import {
  AttributeDefinition,
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  KeySchemaElement,
} from "@aws-sdk/client-dynamodb";

import tableItems from "./table-items.json";
import util from "util";

enum Action {
  PUT = "PutRequest",
  DELETE = "DeleteRequest"
}

export class DynamoDB {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private tableName: string;
  private hashKey: any;
  private rangeKey: any;

  async init(tableName: string) {
    this.tableName = tableName;
    const tableInfo = await this.describeTable();
    const keySchema = tableInfo.Table?.KeySchema;
    if (keySchema) {
      this.hashKey = keySchema.find((key) => key.KeyType === "HASH")?.AttributeName;
      this.rangeKey = keySchema.find((key) => key.KeyType === "RANGE")?.AttributeName;
    }
    console.log(`Hash Key: ${this.hashKey}, Range Key: ${this.rangeKey}`);
  }

  async describeTable() {
    const describeTableCommand = new DescribeTableCommand({
      TableName: this.tableName,
    });
    return this.client.send(describeTableCommand);
  }

  async scanTable() {
    let input: ScanCommandInput = {
      TableName: this.tableName,
      ProjectionExpression: `${this.hashKey}, ${this.rangeKey}`
    };
    let results : Record<string,any>[] = [];
    let lastKey;

    do {
      if (lastKey) {
        input.ExclusiveStartKey = lastKey;
      } else {
        delete input.ExclusiveStartKey;
      }

      const command = new ScanCommand(input);
      const { LastEvaluatedKey, Items } = await this.client.send(command);
      lastKey = LastEvaluatedKey;
      if( Items ) { results.push(...Items) };
    } while (lastKey);

    return results;
  }

  async reset() {
    const items = await this.scanTable();
    
    if(items.length === 0) {
      return;
    }

    const deleteItems = items.map((item) => {
      return {
        DeleteRequest: {
          Key: {
            [this.hashKey]: item[this.hashKey],
            [this.rangeKey]: item[this.rangeKey],
          },
        },
      };
    });

    /*
    const batchWriteCommand = new BatchWriteCommand({
      RequestItems: {
        [this.tableName]: deleteItems,
      },
    });

    return this.client.send(batchWriteCommand);
    */
    return this.batchWrite(deleteItems);
  }

  async batchWrite(requestItems: Record<string, any>[]) {
    const itemChunks = [];
    const chunkSize = 25;


    for (let i = 0; i < requestItems.length; i += chunkSize) {
      const chunk = requestItems.slice(i, i + chunkSize);

      let batchWriteCommand = new BatchWriteCommand({
        RequestItems: {
          [this.tableName]: chunk,
        },
      });

      let result;
      result = await this.client.send(batchWriteCommand);
      let unProcessedItems = result.UnprocessedItems
        ? result.UnprocessedItems
        : {};
      let moreItems = Object.keys(unProcessedItems).length != 0;
      let retries = 3;

      while (moreItems && retries) {
        batchWriteCommand = new BatchWriteCommand({
          RequestItems: unProcessedItems,
        });

        result = await this.client.send(batchWriteCommand);
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

    return { status: "success" };
  }
}

async function main() {
  //console.log(util.inspect(tableItems,{depth:10}));
  const dynamoDB = new DynamoDB();
  await dynamoDB.init("scaffold-test");
  //const info = await dynamoDB.describeTable();
  //console.log(util.inspect(info,{ depth: 10}));

  const requests = tableItems.map((item) => {
    return {
      PutRequest: {
        Item: item,
      },
    };
  });

  const info = await dynamoDB.batchWrite(requests);
  //console.log(info);
  console.log('Before');
  const items = await dynamoDB.scanTable();
  for (const item of items) {
    console.log(util.inspect(item, { depth: 10 }));
  }
  console.log('After');
  await dynamoDB.reset();
  const itemsAfter = await dynamoDB.scanTable();
  for (const item of itemsAfter) {
    console.log(util.inspect(item, { depth: 10 }));
  }
}

main();
