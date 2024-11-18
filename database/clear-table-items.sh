#!/bin/bash


TABLE_NAME=$1

if [ -z "$TABLE_NAME" ]
  then
    echo "Specify a table name."
    exit 1;
fi

HASH_KEY=$(aws dynamodb describe-table --table-name $TABLE_NAME | jq '.Table.KeySchema[] | select(.KeyType=="HASH")'  | jq -r .AttributeName)
RANGE_KEY=$(aws dynamodb describe-table --table-name $TABLE_NAME | jq '.Table.KeySchema[] | select(.KeyType=="RANGE")'  | jq -r .AttributeName)

aws dynamodb scan --attributes-to-get $HASH_KEY $RANGE_KEY \
  --table-name $TABLE_NAME --query "Items[*]" | \
  jq --compact-output '.[]' \
  | tr '\n' '\0' | \
  xargs -0 -t -I keyItem aws dynamodb delete-item --table-name $TABLE_NAME --key=keyItem
