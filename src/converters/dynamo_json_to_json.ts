import * as fs from 'fs';
import path from 'path';
import {
	dynamoItemsToJsItems,
	rowJsonLinesToObjcts,
	writeFile,
	itemsToJson,
} from '../utils';
const rawdata = String(
	fs.readFileSync(path.resolve(__dirname, '../inputs/dynamo.json'))
);

const main = () => {
	const dynamoItems = rowJsonLinesToObjcts(rawdata);
	const items = dynamoItemsToJsItems(dynamoItems);
	const { json, typescript } = itemsToJson(items);
	writeFile('json/fromDynamoJson.json', json);
	writeFile('json/fromDynamoJson.ts', typescript);
};

main();
