#!/bin/bash

CONFIG=water
STAGE=dev

../../../tools/sls-compose -y ../serverless.yml ./platform.yml > serverless-${CONFIG}.yml
cp serverless-${CONFIG}.yml ../../serverless.yml
cp env-${STAGE} ../../.env
cp config.ts ../../config.ts
