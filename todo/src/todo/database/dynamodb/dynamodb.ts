import { ScalarAttributeType, KeyType } from "@aws-sdk/client-dynamodb";

export const pkName = "pk";
export const skName = "sk";

export const todoRepoParams = {
  awssdk: {
    TableName: "todo-repo-default",
    KeySchema: [
      { AttributeName: pkName, KeyType: KeyType.HASH },
      { AttributeName: skName, KeyType: KeyType.RANGE },
    ],
    AttributeDefinitions: [
      { AttributeName: pkName, AttributeType: ScalarAttributeType.S },
      { AttributeName: skName, AttributeType: ScalarAttributeType.S },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  pulumi: {
    attributes: [
      {
        name: pkName,
        type: "S",
      },
    ],
    hashKey: "pk",
    billingMode: "PAY_PER_REQUEST",
  },
};