# dynamoDb converter

## About this repository

This repository help you to convert dynamoDB items file exported on AWS Console to other type of file.

## How to Use

### DynamoDB.json(json lines) => csv

1. copy and paste dynamoDB.json into `./src/inputs/dynamo.json`, which should contain json lines.
2. run the command.
   ```sh
   npm run dynamoJson:csv
   ```

Then, output will be in "./src/outputs/csv/fromDynamoJson.csv"

### DynamoDB.json(json lines) => json

1. copy and paste dynamoDB.json into `./src/inputs/dynamo.json`, which should contain json lines.
2. run the command.
   ```sh
   dynamoJson:json
   ```

Then, output will be in

- "./src/outputs/json/fromDynamoJson.json"
- "./src/outputs/json/fromDynamoJson.ts"
  - type definition for json file.
  - check usage example in "./src/outputs/json/sampleIndex.ts".
