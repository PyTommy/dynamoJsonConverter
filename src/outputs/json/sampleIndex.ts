import { Item } from './fromDynamoJson';
const items = require('./fromDynamoJson.json') as Item[];

// ts-node ./src/converters/dynamo_json_to_json.ts
console.log(items[0].application_id); // 1
console.log(items[0].extraIds); // undefined
