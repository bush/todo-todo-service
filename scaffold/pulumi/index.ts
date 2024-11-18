import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const todoScaffoldTable = new aws.dynamodb.Table("todo-scaffold", {
  attributes: [
    {
      name: "pk",
      type: "S",
    },
    {
      name: "sk",
      type: "S",
    },
  ],
  hashKey: "pk",
  rangeKey: "sk",
  readCapacity: 1,
  writeCapacity: 1,
});

export const tableName = todoScaffoldTable.name
