import * as fs from 'fs';
import path from 'path';
import {
	dynamoItemsToJsItems,
	rowJsonLinesToObjcts,
	itemsToCsv,
	writeFile,
} from '../utils';
const rawdata = String(
	fs.readFileSync(path.resolve(__dirname, '../inputs/dynamo.json'))
);

const main = () => {
	const dynamoItems = rowJsonLinesToObjcts(rawdata);
	const items = dynamoItemsToJsItems(dynamoItems);
	const csv = itemsToCsv(items);
	writeFile('fromJsonLines.csv', csv);
};

main();
